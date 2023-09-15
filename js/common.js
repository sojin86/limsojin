window.addEventListener('load', function () {
    const nav = document.querySelector('nav');
    const menuBtn = document.querySelector('.menu_btn');
    const label = document.querySelector('.label');
    const options = document.querySelectorAll('.optionItem');

    // menu button click => acitve class add
    menuBtn.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
    document.querySelector('body').addEventListener('click', function (e) {
        if (e.target == e.currentTarget.querySelector('.label')) {
        } else {
            label.parentNode.classList.remove('active');
        }
    });

    // selectbox click event
    const handleSelect = function (e) {
        label.innerHTML = e.textContent;
        label.parentNode.classList.remove('active');
    };
    options.forEach(function (e) {
        e.addEventListener('click', function () {
            handleSelect(e);
        });
    });
    label.addEventListener('click', function () {
        if (label.parentNode.classList.contains('active')) {
            label.parentNode.classList.remove('active');
        } else {
            label.parentNode.classList.add('active');
        }
    });

    // 버튼 클릭 시 맨 위로 이동

    const topBtn = document.querySelector('.topBtn');
    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});
