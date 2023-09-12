window.addEventListener('load', function () {
    var main_scroll = document.querySelector('.main_img_wrap');
    window.addEventListener('scroll', function () {
        var value = 1 + window.scrollY / -600;
        main_scroll.style.transform = `scaleY(${value})`;
    });

    // swiper function
    new Swiper('.swiper', {
        loop: true, // 슬라이드 반복 여부
        slidesPerView: 1, // 한 슬라이드에 보여줄 갯수
        centeredSlides: true, // 가운데 정렬
        spaceBetween: 60, // 슬라이드 사이 여백
        pagination: {
            // 슬라이드 순서 버튼 지정
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
    });

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        document.querySelector('body').classList.add('moblie');
        document.querySelector('body').classList.remove('web');
        console.log('!11');
    } else {
        console.log('@22');
        document.querySelector('body').classList.add('web');
        document.querySelector('body').classList.remove('moblie');
        (function () {
            init();

            function init() {
                setStickyContainersSize();
                bindEvents();
            }

            function bindEvents() {
                window.addEventListener('wheel', wheelHandler);
            }

            function setStickyContainersSize() {
                document.querySelectorAll('.container').forEach(function (container) {
                    const stikyContainerHeight = container.querySelector('.mains').scrollWidth;
                    container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
                });
            }

            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
            }

            function wheelHandler(evt) {
                const containerInViewPort = Array.from(document.querySelectorAll('.container')).filter(function (
                    container
                ) {
                    return isElementInViewport(container);
                })[0];

                if (!containerInViewPort) {
                    return;
                }

                var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
                var isPlaceHolderBelowBottom =
                    containerInViewPort.offsetTop + containerInViewPort.offsetHeight >
                    document.documentElement.scrollTop;
                let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

                if (g_canScrollHorizontally) {
                    containerInViewPort.querySelector('.mains').scrollLeft += evt.deltaY;
                }
            }
        })();
    }
});
