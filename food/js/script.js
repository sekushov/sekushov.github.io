window.addEventListener("DOMContentLoaded", () => {

    //Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none";
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {        //по-умолчанию i=0, если не передается иное значение
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });



    
    // Timer

    function getRes(end) {
        const now = new Date(),
            t = Date.parse(end) - Date.parse(now),
            days = Math.floor(t/1000/60/60/24),     //округление до целых
            hours = Math.floor(t/1000/60/60) % 24,
            minutes = Math.floor(t/1000/60) % 60,
            seconds = Math.floor(t/1000) % 60;
        
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function setTime(end) {
        let days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds");
        const timeInterval = setInterval(updateTime, 1000);

        function setZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
        
        function updateTime() {
            const t = getRes(end);
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = 0,
                hours.innerHTML = 0,
                minutes.innerHTML = 0,
                seconds.innerHTML = 0;
            } else {
                days.innerHTML = setZero(t.days);
                hours.innerHTML = setZero(t.hours);
                minutes.innerHTML = setZero(t.minutes);
                seconds.innerHTML = setZero(t.seconds);
            }
        }
        updateTime();
    }
    const dateEnd = "2023-10-30";
    setTime(dateEnd);





    // Modal
    const modal = document.querySelector(".modal"),
        modalBtn = document.querySelectorAll("[data-modal]");

    function showModal() {
        modal.classList.remove("hide");
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimer);
    }
    const modalTimer = setTimeout(showModal, 50000);
    function hideModal() {
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.style.overflow = "";
    }
    modalBtn.forEach(btn => {
        btn.addEventListener("click", showModal);
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            hideModal();
        }
    });
    modal.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            hideModal();
        }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
    


    // Class

    class menu_item {
        constructor(title, img_src, alt, description, price, parent, ...classes) {
            this.title = title;
            this.img_src = img_src;
            this.alt = alt;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.classes = classes;
        }
        render() {
            const menu___item = document.createElement("div");
            if (this.classes.length === 0) {
                menu___item.classList.add("menu__item");
            } else {
                this.classes.forEach(item => menu___item.classList.add(item));
            }
            menu___item.innerHTML = `
                <img src=${this.img_src} alt=${this.alt}>
                <h3 class='menu__item-subtitle'>${this.title}</h3>
                <div class='menu__item-descr'>${this.description}</div>
                <div class='menu__item-divider'></div>
                <div class='menu__item-price'>
                    <div class='menu__item-cost'>Цена:</div>
                    <div class='menu__item-total'><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(menu___item);
        }
    }
    
    new menu_item(
        'Меню "Фитнес"',
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new menu_item(
        'Меню "Постное"',
        "img/tabs/post.jpg",
        "post",
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new menu_item(
        'Меню “Премиум”',
        "img/tabs/elite.jpg",
        "elite",
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

    // Forms

    const forms = document.querySelectorAll("form"),
        message = {
            loading: "img/spinner.svg",
            success: "Спасибо, скоро мы с вами свяжемся!",
            failure: "Что-то пошло не так"
        };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const messageStatus = document.createElement("img");
            messageStatus.src = message.loading;
            messageStatus.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", messageStatus);  // помещаем messagestatus после form

            const formData = new FormData(form);            // собираем все поля формы form в объект formData

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
                messageStatus.remove();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");   // контент предыдущей модалки
        prevModalDialog.classList.add("hide");                          // скроем контент
        showModal();                                                    // откроем модалку
        const thanksModal = document.createElement("div");              // создаем новый контент
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {                                              // убираем чз 4сек
            thanksModal.remove();
            prevModalDialog.classList.remove("hide");
            prevModalDialog.classList.add("show");
            hideModal();
        }, 4000);
    }



    // Slider
    function slider(slideSelector, prevSelector, nextSelector, counterCurrentSelector, counterTotalSelector, wrapperSelector, fieldSelector) {
        const slides = document.querySelectorAll(slideSelector),
                prevSlide = document.querySelector(prevSelector),
                nextSlide = document.querySelector(nextSelector),
                counterCurrent = document.querySelector(counterCurrentSelector),
                counterTotal = document.querySelector(counterTotalSelector),
                slidesWrapper = document.querySelector(wrapperSelector),
                slidesField = document.querySelector(fieldSelector),
                width = window.getComputedStyle(slidesWrapper).width;
        let activeSlide = 1,
            offset = 0;

        slidesField.style.width = slides.length * 100 + "%";
        slidesField.style.display = "flex";
        slidesField.style.transition = "0.5s all";
        slidesWrapper.style.overflow = "hidden";

        const slidesNav = document.createElement("ol");
        let dots = [];
        slidesNav.classList.add("carousel-indicators");
        slidesWrapper.style.position = "relative";
        slidesWrapper.append(slidesNav);
        for (let i = 1; i <= slides.length; i++) {
            dots[i] = document.createElement("li");
            dots[i].classList.add("dot");
            slidesNav.append(dots[i]);
            dots[i].addEventListener("click", () => {
                offset = +width.slice(0, width.length - 2) * (i - 1);
                slidesField.style.transform = `translateX(-${offset}px)`;
                activeSlide = i;
                changeCounter();
                changeSliderIndicator();
            });
        }
        function changeSliderIndicator() {
            for (let i = 1; i <= slides.length; i++) {
                dots[i].style.opacity = "";
            }
            dots[activeSlide].style.opacity = "1";
        }
        changeSliderIndicator();
        for (let i = 1; i <= slides.length; i++) {
        }
        
        slides.forEach(slide => {
            slide.style.width = width;
        });

        if (slides.length < 10) {
            counterTotal.textContent = `0${slides.length}`;
            counterCurrent.textContent = `0${activeSlide}`;
        } else {
            counterTotal.textContent = slides.length;
            counterCurrent.textContent = activeSlide;
        }
        function changeCounter() {
            if (slides.length < 10) {
                counterCurrent.textContent = `0${activeSlide}`;
            } else {
                counterCurrent.textContent = activeSlide;
            }
        }
        function toDigits(str) {                // регулярное выражение
            return +str.replace(/px/g, "");
        }
        nextSlide.addEventListener("click", () => {
            if (offset == toDigits(width) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += toDigits(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (activeSlide == slides.length) {
                activeSlide = 1;
            } else {
                activeSlide++;
            }
            changeCounter();
            changeSliderIndicator();
        });
        prevSlide.addEventListener("click", () => {
            if (offset == 0) {
                offset = toDigits(width) * (slides.length - 1);
            } else {
                offset -= toDigits(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (activeSlide == 1) {
                activeSlide = slides.length;
            } else {
                activeSlide--;
            }
            changeCounter();
            changeSliderIndicator();
        });
        
    }
    slider(".offer__slide", ".offer__slider-prev", ".offer__slider-next", "#current", "#total", ".offer__slider-wrapper", ".offer__slider-inner");



    // calculator

    const total = document.querySelector(".calculating__result span");
    let gender, height, weight, age, ratio;
    if (localStorage.getItem("gender")) {
        gender = localStorage.getItem("gender");
    }
    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    }
    function setActiveClass(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute("id") == localStorage.getItem("gender")) {
                item.classList.add(activeClass);
            }
        });
    }
    setActiveClass("#gender div", "calculating__choose-item_active");
    setActiveClass(".calculating__choose_big div", "calculating__choose-item_active");

    function getTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            total.textContent = "";
            return;
        }
        switch (gender){
            case "female":
                total.textContent = Math.round((447.6 + 9.2*weight + 3.1*height - 4.3*age) * ratio);
                break;
            case "male":
                total.textContent = Math.round((88.36 + 13.4*weight + 4.8*height - 5.7*age) * ratio);
                break;
        }
    }
    getTotal();
    function getStaticContent(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.addEventListener("click", (e) => {
                elements.forEach(item => item.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                if (e.target.getAttribute("data-ratio")) {
                    ratio = e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", e.target.getAttribute("data-ratio"));
                } else {
                    gender = e.target.getAttribute("id");
                    localStorage.setItem("gender", e.target.getAttribute("id"));
                }
                getTotal();
            });
        });
    }
    getStaticContent("#gender div", "calculating__choose-item_active");
    getStaticContent(".calculating__choose_big div", "calculating__choose-item_active");
    function getDynamicContent(inputsSelector) {
        const inputs = document.querySelectorAll(inputsSelector);
        inputs.forEach(input => {
            input.addEventListener("input", (e) => {
                if (input.value.match(/\D/g)) {
                    input.style.border = "2px solid red"
                } else {
                    input.style.border = "none"
                };
                switch (e.target.getAttribute("id")) {
                    case "height": 
                        height = +input.value;
                        break;
                    case "weight": 
                        weight = +input.value;
                        break;
                    case "age": 
                        age = +input.value;
                        break;
                }
                getTotal();
            });
        });
    }
    getDynamicContent(".calculating__choose_medium input");
  

});