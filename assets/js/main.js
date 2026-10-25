(function ($) {
    "use strict";
    const $documentOn = $(document);
    const $windowOn = $(window);
    $documentOn.ready(function () {
        $("#mobile-menu").meanmenu({
            meanMenuContainer: ".mobile-menu",
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });
        $("#mobile-menus").meanmenu({
            meanMenuContainer: ".mobile-menus",
            meanScreenWidth: "1920",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });
        $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function () {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
        });
        $(".body-overlay").on("click", function () {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");
            $(".body-overlay").removeClass("opened");
        });
        function toggleBackTop() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                $("#back-top").addClass("show");
            } else {
                $("#back-top").removeClass("show");
            }
        }
        $windowOn.on("scroll", function () {
            toggleBackTop();
        });
        $(document).ready(function () {
            $("#back-top").removeClass("show");
        });
        $documentOn.on("click", "#back-top", function () {
            $("html, body").animate({ scrollTop: 0 }, 800);
            return false;
        });
        $windowOn.on("scroll", function () {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });
        $(".img-popup2").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });
        $(".video-popup").magnificPopup({
            type: "iframe",
            callbacks: {},
        });
        new WOW().init();
        $("select").niceSelect();
        if ($(".hero-slider").length > 0) {
            const HeroSlider = new Swiper(".hero-slider", {
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }
        if ($(".room-slider").length > 0) {
            const RoomSlider = new Swiper(".room-slider", {
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 3.2,
                    },
                    767: {
                        slidesPerView: 2.1,
                    },
                    575: {
                        slidesPerView: 2.2,
                    },
                    0: {
                        slidesPerView: 1.2,
                    },
                },
            });
        }
        if ($(".room-slider-2").length > 0) {
            const RoomSlider2 = new Swiper(".room-slider-2", {
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2.1,
                    },
                    575: {
                        slidesPerView: 2.2,
                    },
                    0: {
                        slidesPerView: 1.2,
                    },
                },
            });
        }
        if ($(".testimonial-slider").length > 0) {
            const TestimonialSlider = new Swiper(".testimonial-slider", {
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 1,
                    },
                    991: {
                        slidesPerView: 1,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }
        if ($(".testimonial-slider-3").length > 0) {
            const TestimonialSlider3 = new Swiper(".testimonial-slider-3", {
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 7,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }
        if ($(".offer-slider").length > 0) {
            const OfferSlider = new Swiper(".offer-slider", {
                direction: "vertical",
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 3,
                    },
                },
            });
        }
        if ($(".offer-slider-2").length > 0) {
            const OfferSlider2 = new Swiper(".offer-slider-2", {
                spaceBetween: 30,
                speed: 1300,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot2",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }
        if ($(".details-slider").length > 0 && $(".details-slider-2").length > 0) {
            const DetailsSlider2 = new Swiper(".details-slider-2", {
                spaceBetween: 30,
                speed: 1e3,
                loop: true,
                slidesPerView: 4,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1199: { slidesPerView: 4 },
                    991: { slidesPerView: 3 },
                    767: { slidesPerView: 2 },
                    575: { slidesPerView: 2 },
                    0: { slidesPerView: 2 },
                },
            });
            const DetailsSlider = new Swiper(".details-slider", {
                spaceBetween: 30,
                speed: 1300,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                thumbs: {
                    swiper: DetailsSlider2,
                    // <-- linking thumbnail slider
                },
            });
            DetailsSlider2.on("click", function (swiper) {
                const clickedIndex = swiper.clickedIndex;
                if (typeof clickedIndex !== "undefined") {
                    DetailsSlider.slideToLoop(clickedIndex);
                }
            });
        }
        const instagramBannerSlider = new Swiper(".instagram-banner-slider", {
            spaceBetween: 30,
            speed: 1500,
            loop: true,
            autoplay: {
                delay: 1e3,
                disableOnInteraction: false,
            },
            breakpoints: {
                1399: {
                    slidesPerView: 6,
                },
                1199: {
                    slidesPerView: 5,
                },
                991: {
                    slidesPerView: 4,
                },
                767: {
                    slidesPerView: 3,
                },
                650: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
        $(".news-list .news-service").on("mouseenter", function (e) {
            var index = $(this).index();
            $(".news-img-group li").removeClass("active");
            $(".news-img-group li:eq(" + index + ")").addClass("active");
        });
        if ($(".brand-slider").length > 0) {
            const BrandSlider = new Swiper(".brand-slider", {
                spaceBetween: 30,
                speed: 1300,
                loop: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 6,
                    },
                    1199: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 5,
                    },
                    767: {
                        slidesPerView: 4,
                    },
                    575: {
                        slidesPerView: 3,
                    },
                    400: {
                        slidesPerView: 3,
                    },
                    0: {
                        slidesPerView: 2,
                    },
                },
            });
        }
        if ($(".dining-slider").length > 0 && $(".hotel-slider").length > 0) {
            const DiningSlider = new Swiper(".dining-slider", {
                spaceBetween: 20,
                speed: 1e3,
                loop: true,
                autoplay: {
                    delay: 3e3,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-next",
                    prevEl: ".array-prev",
                },
                breakpoints: {
                    1199: { slidesPerView: 4 },
                    991: { slidesPerView: 3 },
                    767: { slidesPerView: 3 },
                    575: { slidesPerView: 3 },
                    0: { slidesPerView: 2 },
                },
            });
            const HotelSlider = new Swiper(".hotel-slider", {
                spaceBetween: 20,
                speed: 800,
                loop: true,
                slidesPerView: 1,
                effect: "slide",
            });
            $(".dining-slider .swiper-slide").on("click", function () {
                const realIndex = Number(this.getAttribute("data-swiper-slide-index"));
                HotelSlider.slideToLoop(realIndex, 800);
            });
            DiningSlider.on("slideChange", function () {
                HotelSlider.slideToLoop(DiningSlider.realIndex, 800);
            });
        }
        if ($(".gallery-slider").length > 0) {
            const GallerySlider = new Swiper(".gallery-slider", {
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 2.3,
                    },
                    767: {
                        slidesPerView: 2.1,
                    },
                    575: {
                        slidesPerView: 2.1,
                    },
                    0: {
                        slidesPerView: 1.2,
                    },
                },
            });
        }
        if ($(".team-slider").length > 0) {
            const TeamSlider = new Swiper(".team-slider", {
                spaceBetween: 20,
                speed: 1300,
                loop: true,
                autoplay: {
                    delay: 2e3,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }
        const serviceItems = document.querySelectorAll(".service-main-item");
        serviceItems.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                serviceItems.forEach((el) => el.classList.remove("active"));
                item.classList.add("active");
            });
        });
        $(".accordion-single .header-area").on("click", function () {
            if ($(this).closest(".accordion-single").hasClass("active")) {
                $(this).closest(".accordion-single").removeClass("active");
                $(this).next(".content-area").slideUp();
            } else {
                $(".accordion-single").removeClass("active");
                $(this).closest(".accordion-single").addClass("active");
                $(".content-area").not($(this).next(".content-area")).slideUp();
                $(this).next(".content-area").slideToggle();
            }
        });
        $(window).on("scroll", function () {
            $(".odometer").each(function () {
                var el = $(this);
                if (el.offset().top < $(window).scrollTop() + $(window).height()) {
                    if (!el.hasClass("counted")) {
                        el.addClass("counted");
                        el.html(el.attr("data-count"));
                    }
                }
            });
        });
    });
    window.addEventListener("load", function () {
        const preloader = document.getElementById("preloader");
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 1500);
    });
    if ($(".mouseCursor").length > 0) {
        let itCursor = function () {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n,
                        i = 0,
                        o = false;
                    ((window.onmousemove = function (s) {
                        (o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (n = s.clientY),
                            (i = s.clientX));
                    }),
                        $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
                            (e.classList.add("cursor-hover"), t.classList.add("cursor-hover"));
                        }),
                        $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
                            ($(this).is("a", "button") && $(this).closest(".cursor-pointer").length) ||
                                (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"));
                        }),
                        (e.style.visibility = "visible"),
                        (t.style.visibility = "visible"));
                }
            }
        };
        itCursor();
    }
})(jQuery);
