const userAgent = navigator.userAgent.toLowerCase();
const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
const portfolio = document.querySelector('.portfolio');

renderButton({
    img: "./img/marvel-api.jpg",
    title: "Marvel API",
    descr: "Фан-сайт Marvel на React с использованием API",
    solutions: ["Каталог персонажей", "Вывод информации о персонаже", "Дозагрузка каталога"],
    linkProject: "https://sekushov.github.io/marvel-api/build",
    linkCode: "https://github.com/sekushov/marvel-api"
});
renderButton({
    img: "./img/tiles-game.jpg",
    title: "Игра-головоломка",
    descr: "Игра на связке React-Redux",
    solutions: ["Игра состоит из нескольких пар скрытых карточек", "Необходимо открывать карточки попарно так, чтобы выбрать одинаковые", "Игра считается пройденной, когда найдены все пары", "Количество открытий и время игры подсчитываются"],
    linkProject: "https://sekushov.github.io/tiles-game/build",
    linkCode: "https://github.com/sekushov/tiles-game"
});
renderButton({
    img: "./img/calculator.jpg",
    title: "Ипотечный помощник",
    descr: "Приложение на JavaScript по принципу MVC",
    solutions: ["Интерактивный калькулятор ипотеки", "Добавление расчётов в сравнение, сортировка, удаление", "Хранение списка сравнения", "Адаптация под разные экраны"],
    linkProject: "https://sekushov.github.io/mortgage-calculator/",
    linkCode: "https://github.com/sekushov/mortgage-calculator"
});
renderButton({
    img: "./img/game.jpg",
    title: "Игра Аркада",
    descr: "Игра на чистом JavaScript. JS + HTML + CSS",
    solutions: ["Несколько уровней игры", "Начисление очков", "Обновляемая таблица ТОПов", "Управление с клавиатуры или сенсором"],
    linkProject: "https://sekushov.github.io/game-JS/",
    linkCode: "https://github.com/sekushov/game-JS"
});
renderButton({
    img: "./img/qpick-shop.jpg",
    title: "Шаблон интернет-магазина",
    descr: "Приложение на React",
    solutions: ["Реализация работы с корзиной", "Маршрутизация React"],
    linkProject: "https://sekushov.github.io/qpick-shop-react/build/",
    linkCode: "https://github.com/sekushov/qpick-shop-react"
});
renderButton({
    img: "./img/inform-panel.jpg",
    title: "Информативная панель",
    descr: "Панель с виджетами на JS",
    solutions: ["Блок погоды, поддерживающий все населенные пункты России", "Блок to do list", "Отображение даты и времени", "Введенные данные запоминаются в localStorage"],
    linkProject: "https://sekushov.github.io/inform-panel/",
    linkCode: "https://github.com/sekushov/inform-panel"
});
renderButton({
    img: "./img/rusdrevstroy.jpg",
    title: "Landing page",
    descr: "Создание дизайна в Figma + верстка + адаптация + JavaScript",
    solutions: ["Вкладки (табы), слайдер", "Калькулятор стоимости", "Акция с обратным отсчётом", "Собрано с Webpack"],
    linkProject: "https://sekushov.github.io/rusdrevstroy/",
    linkCode: "https://github.com/sekushov/rusdrevstroy"
});
renderButton({
    img: "./img/employees.jpg",
    title: "Учёт сотрудников - React",
    descr: "Небольшое приложение на классовых компонентах",
    solutions: ["Добавление, изменение, удаление элементов", "Реализация поисковой строки", "Фильтрация списка", "Сохранение изменений"],
    linkProject: "https://sekushov.github.io/employees-react/build/",
    linkCode: "https://github.com/sekushov/employees-react"
});
renderButton({
    img: "./img/test-remont.jpg",
    title: "Сайт по ремонту квартир",
    descr: "Главный экран сайта по ремонту квартир",
    solutions: ["Верстка по ТЗ с макета Figma", "Адаптация под разные экраны"],
    linkProject: "https://sekushov.github.io/test-remont/",
    linkCode: "https://github.com/sekushov/test-remont"
});
renderButton({
    img: "./img/ritvi.jpg",
    title: "Интернет-магазин",
    descr: "Магазин на OpenCart из 2016-го. Делал с нуля для себя, вдохновлялся Алиэкспрессом",
    solutions: ["Возможность регистрации и авторизации", "Фильтр, поиск, корзина, избранное", "Отслеживание своих заказов и т.д.", "Панель администратора"],
    linkProject: "http://c98710q3.bget.ru/",
    linkCode: "http://c98710q3.bget.ru/"}
)

function renderButton ({img, title, descr, solutions, linkProject, linkCode}) {
    portfolio.insertAdjacentHTML('beforeend', `
        <div class="btn">
            <img src=${img} alt=${title} class="btn-bg">
            <div class="btn-bg-color"></div>
            <div class="btn-text-wrapper">
                <div class="btn-text-wrapper-cont">
                    <div class="btn-title">
                        ${title}
                    </div>
                    <div class="btn-descr">
                        ${descr}
                    </div>
                    <div class="btn-solution">
                        Функционал:
                        <ul class="btn-solution-descr">
                            ${solutions.map(sol => {
                                return '<li>' + sol + '</li>'
                            }).join('')}
                        </ul>
                    </div> 
                    <div class="btn-links">
                        <a href=${linkProject} target="_blank">проект</a>
                        <a href=${linkCode} target="_blank">код</a>
                    </div>
                </div>
            </div>
        </div>
    `)
}


if (isMobile) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => showDescrMobile(e));
    });
    document.querySelector('.container').addEventListener('click', (e) => hideDescrMobile(e));
    function showDescrMobile(e) {
        if (!e.currentTarget.classList.contains('active')) { 
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
        }
    }
    function hideDescrMobile(e) {
        if (e.target.classList.contains('container')) {
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }  
    }
} else {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', (e) => e.currentTarget.classList.add('active'));
        btn.addEventListener('mouseleave', () => hideDescrNotMobile());
    });
    function hideDescrNotMobile() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}
