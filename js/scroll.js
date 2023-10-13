window.addEventListener('load', function () {
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
        autoplay: {
            // 자동슬라이드
            delay: 3500, // 시간
        },
    });

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        document.querySelector('body').classList.add('moblie');
        document.querySelector('body').classList.remove('web');
    } else {
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
                document.querySelectorAll('.scroll_container').forEach(function (container) {
                    const stikyContainerHeight = container.querySelector('.container').scrollWidth;
                    container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
                    console.log(stikyContainerHeight);
                });
            }

            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
            }

            function wheelHandler(evt) {
                const containerInViewPort = Array.from(document.querySelectorAll('.scroll_container')).filter(function (
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
                    containerInViewPort.querySelector('.container').scrollLeft += evt.deltaY;
                }
            }
        })();
    }

    // animation 추가 위로 올라오기
    window.addEventListener('scroll', fnUpDown);
    function fnUpDown() {
        const UpDown = document.querySelectorAll('.ani_updown');
        for (var i = 0; i < UpDown.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = UpDown[i].getBoundingClientRect().top;
            var elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                UpDown[i].classList.add('active');
            }
        }
    }

    // ptoject tablet 버튼 클릭시 이미지 변경
    const tabWrap = document.querySelector('.show_site');
    const tabItem = document.querySelectorAll('.section_01 .btn_wrap li');
    const tabInner = document.querySelectorAll('.show_site .img_box');

    tabItem.forEach((tab, idx) => {
        tab.addEventListener('click', function () {
            tabWrap.scrollTo({ top: 0 });

            tabInner.forEach((inner) => {
                inner.classList.remove('active');
            });
            tabInner[idx].classList.add('active');

            tabItem.forEach((item) => {
                item.classList.remove('active');
            });
            tabItem[idx].classList.add('active');
        });
    });
});
