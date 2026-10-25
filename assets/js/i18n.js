(function () {
    "use strict";

    var data = window.SITE_I18N;
    if (!data) return;

    var LANGS = [
        { code: "en", label: "English (US)", short: "EN", htmlLang: "en" },
        { code: "en-GB", label: "English (UK)", short: "UK", htmlLang: "en-GB" },
        { code: "bn", label: "বাংলা", short: "বাং", htmlLang: "bn" },
        { code: "hi", label: "हिन्दी", short: "हिं", htmlLang: "hi" },
        { code: "ja", label: "日本語", short: "日本", htmlLang: "ja" },
        { code: "de", label: "Deutsch", short: "DE", htmlLang: "de" },
    ];

    var UK_SPELLING = {
        center: "centre",
        color: "colour",
        colors: "colours",
        cozy: "cosy",
        traveler: "traveller",
        travelers: "travellers",
        analyzing: "analysing",
        favorite: "favourite",
        neighborhood: "neighbourhood",
        organize: "organise",
    };

    var FONT_FAMILIES = {
        bn: "Noto+Sans+Bengali:wght@400;600;700",
        hi: "Noto+Sans+Devanagari:wght@400;600;700",
        ja: "Noto+Sans+JP:wght@400;500;700",
    };

    var STORAGE_KEY = "site-language";
    var currentLang = "en";
    var originals = new WeakMap();
    var attrOriginals = new WeakMap();
    var observer = null;
    var pending = false;
    var applying = false;

    function readStored() {
        try {
            return window.localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function store(code) {
        try {
            window.localStorage.setItem(STORAGE_KEY, code);
        } catch (e) {}
    }

    function findLang(code) {
        for (var i = 0; i < LANGS.length; i++) {
            if (LANGS[i].code === code) return LANGS[i];
        }
        return null;
    }

    function normalize(text) {
        return text.replace(/\s+/g, " ").trim();
    }

    function toUk(text) {
        return text.replace(/\b[A-Za-z]+\b/g, function (word) {
            var replacement = UK_SPELLING[word.toLowerCase()];
            if (!replacement) return word;
            if (word.charAt(0) !== word.charAt(0).toLowerCase()) {
                return replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            return replacement;
        });
    }

    function translate(original, code) {
        if (code === "en") return original;
        if (code === "en-GB") return toUk(original);

        var table = data.lang[code];
        if (!table) return original;

        var key = normalize(original).split(data.brand).join("{brand}");
        var result = table[key];
        if (!result) return original;
        return result.split("{brand}").join(data.brand);
    }

    function translateTextNode(node, code) {
        if (!originals.has(node)) {
            if (!/[A-Za-z]{2}/.test(node.data)) return;
            originals.set(node, node.data);
        }
        var original = originals.get(node);
        if (code === "en") {
            if (node.data !== original) node.data = original;
            return;
        }
        var lead = original.match(/^\s*/)[0];
        var trail = original.match(/\s*$/)[0];
        var translated = translate(original, code);
        var next = translated === original ? original : lead + translated + trail;
        if (node.data !== next) node.data = next;
    }

    var ATTRS = ["placeholder", "title", "aria-label"];

    function translateAttributes(el, code) {
        var saved = attrOriginals.get(el) || {};
        ATTRS.forEach(function (attr) {
            if (!el.hasAttribute(attr)) return;
            if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
            var value = code === "en" ? saved[attr] : translate(saved[attr], code);
            if (el.getAttribute(attr) !== value) el.setAttribute(attr, value);
        });
        if (el.tagName === "INPUT" && /^(submit|button)$/.test(el.type)) {
            if (!("value" in saved)) saved.value = el.value;
            var shown = code === "en" ? saved.value : translate(saved.value, code);
            if (el.value !== shown) el.value = shown;
        }
        attrOriginals.set(el, saved);
    }

    function applyTo(root, code) {
        var skip = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                var parent = node.parentNode;
                if (!parent || skip.test(parent.nodeName)) return NodeFilter.FILTER_REJECT;
                if (parent.closest && parent.closest(".lang-switch")) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            },
        });
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function (node) {
            translateTextNode(node, code);
        });

        var elements = root.nodeType === 1 ? root.querySelectorAll("[placeholder],[title],[aria-label],input") : [];
        Array.prototype.forEach.call(elements, function (el) {
            translateAttributes(el, code);
        });
    }

    function applyDocumentMeta(code) {
        var titleEl = document.querySelector("title");
        if (titleEl) {
            if (!titleEl.dataset.original) titleEl.dataset.original = titleEl.textContent;
            titleEl.textContent = code === "en" ? titleEl.dataset.original : translate(titleEl.dataset.original, code);
        }
        var meta = document.querySelector('meta[name="description"]');
        if (meta) {
            if (!meta.dataset.original) meta.dataset.original = meta.getAttribute("content");
            meta.setAttribute(
                "content",
                code === "en" ? meta.dataset.original : translate(meta.dataset.original, code),
            );
        }
    }

    function loadFont(code) {
        var family = FONT_FAMILIES[code];
        if (!family) return;
        var id = "lang-font-" + code;
        if (document.getElementById(id)) return;
        var link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=" + family + "&display=swap";
        document.head.appendChild(link);
    }

    function applyAll() {
        applying = true;
        if (observer) observer.disconnect();
        applyTo(document.body, currentLang);
        applyDocumentMeta(currentLang);
        applying = false;
        startObserver();
    }

    function startObserver() {
        if (!window.MutationObserver) return;
        if (!observer) {
            observer = new MutationObserver(function () {
                if (applying || pending) return;
                pending = true;
                window.setTimeout(function () {
                    pending = false;
                    applyAll();
                }, 120);
            });
        }
        observer.observe(document.body, { childList: true, subtree: true, characterData: false });
    }

    function setLanguage(code, persist) {
        var lang = findLang(code) || LANGS[0];
        currentLang = lang.code;
        document.documentElement.setAttribute("lang", lang.htmlLang);
        loadFont(lang.code);
        applyAll();
        updateSwitch(lang);
        if (persist) store(lang.code);
    }

    var switchEl = null;

    function updateSwitch(lang) {
        if (!switchEl) return;
        switchEl.querySelector(".lang-switch__current").textContent = lang.label;
        Array.prototype.forEach.call(switchEl.querySelectorAll(".lang-switch__option"), function (btn) {
            var active = btn.getAttribute("data-lang") === lang.code;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-checked", active ? "true" : "false");
        });
    }

    function buildSwitch() {
        switchEl = document.createElement("div");
        switchEl.className = "lang-switch";
        switchEl.setAttribute("translate", "no");

        var globe =
            '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 4 6 4 9.5s-1.4 6.8-4 9.5c-2.6-2.7-4-6-4-9.5s1.4-6.8 4-9.5z"/></svg>';

        var options = LANGS.map(function (lang) {
            return (
                '<li role="none"><button type="button" role="menuitemradio" class="lang-switch__option" data-lang="' +
                lang.code +
                '" lang="' +
                lang.htmlLang +
                '">' +
                lang.label +
                "</button></li>"
            );
        }).join("");

        switchEl.innerHTML =
            '<button type="button" class="lang-switch__toggle" aria-haspopup="true" aria-expanded="false" aria-label="Language">' +
            globe +
            '<span class="lang-switch__current"></span></button>' +
            '<ul class="lang-switch__menu" role="menu">' +
            options +
            "</ul>";

        var toggle = switchEl.querySelector(".lang-switch__toggle");

        toggle.addEventListener("click", function (event) {
            event.stopPropagation();
            var open = switchEl.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });

        switchEl.addEventListener("click", function (event) {
            var btn = event.target.closest(".lang-switch__option");
            if (!btn) return;
            setLanguage(btn.getAttribute("data-lang"), true);
            switchEl.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });

        document.addEventListener("click", function () {
            switchEl.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") switchEl.classList.remove("is-open");
        });

        document.body.appendChild(switchEl);
    }

    function init() {
        buildSwitch();
        var fromUrl = null;
        try {
            fromUrl = new URLSearchParams(window.location.search).get("lang");
        } catch (e) {}
        var initial = (fromUrl && findLang(fromUrl) && fromUrl) || readStored() || "en";
        setLanguage(initial, !!fromUrl);
    }

    init();
})();
