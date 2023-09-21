document.addEventListener("DOMContentLoaded", () => {
    //menu
    const hamburger = document.querySelector(".hamburger"),
          header = document.querySelector("header"),
          menu = document.querySelector(".menu"),
          menuLink = document.querySelectorAll(".menu_link");
    hamburger.addEventListener("click", () => {
        if (hamburger.classList.contains("hamburger_active")) {
            menu.style.left = "-100%";
            hamburger.classList.remove("hamburger_active");
        } else {
            menu.style.left = "0";
            hamburger.classList.add("hamburger_active");
            menuLink.forEach(link => {
                link.addEventListener("click", () => {
                    menu.style.left = "-100%";
                    hamburger.classList.remove("hamburger_active");
                });
            })
        }
    });
    function setMenuBg() {
        if (window.scrollY == 0 && window.innerWidth >= 576) {
            header.style.cssText = "background: none; box-shadow: none";
            menuLink.forEach(menuLink => menuLink.style.cssText = "color: #fff");
        } else {
            header.style.cssText = "";
            menuLink.forEach(menuLink => menuLink.style.cssText = "");
        }
    }
    setMenuBg();
    window.addEventListener("scroll", setMenuBg);




    //modal
    const modalTriggers = document.querySelectorAll(".modal_trigger"),
          modal = document.querySelector(".modal");
    function showModal() {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
    function hideModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            showModal();
        });
    });
    modal.addEventListener("click", (e) => {
        if(e.target === modal || e.target.classList.contains("modal_close")) {
            hideModal();
        }
    });





    //tabs
    const techContents = document.querySelectorAll(".tech_content"),
          techHeaderItems = document.querySelectorAll(".tech_header_item");
    
    function showtechContent(i) {
        techContents.forEach(content => {
            content.style.display = "none"
        });
        techContents[i].style.display = "block";
    }
    showtechContent(2);

    techHeaderItems.forEach((item, i) => {
        item.addEventListener("click", () => {
            showtechContent(i);
            techHeaderItems.forEach(item => {
                item.classList.remove("tech_header_item_active");
            });
            item.classList.add("tech_header_item_active");
        });
    });




    //calc
    const calcItemsStage = document.querySelectorAll("[data-stage]"),
          calcItemsMaterial = document.querySelectorAll("[data-material]"),
          calcInputPlot = document.querySelector("[data-input-plot]"),
          calcInputHouse = document.querySelector("[data-input-house]"),
          calcResult = document.querySelector(".calc_result_value");
    
    function changeActiveItem(items, classActive) {
        items.forEach(item => {
            item.addEventListener("click", () => {
                items.forEach(item => {
                    item.classList.remove(classActive);
                });
                item.classList.add(classActive);
                calcResult.textContent = getCalcResult().toLocaleString();
                changePromoPrice();
            });
        });
    }
    changeActiveItem(calcItemsStage, "calc_item_active");
    changeActiveItem(calcItemsMaterial, "calc_item_active");

    function getCalcResult() {
        if (!calcInputPlot.value || !calcInputHouse.value || calcInputPlot.value < 1 || calcInputHouse.value < 1) {
            total = 0;
            return total;
        }
        function getItems(items, attribute) {
            items.forEach(item => {
                if (item.classList.contains("calc_item_active")) {
                    result = item.getAttribute(attribute);
                }
            });
            return result;
        }
        const resStage = getItems(calcItemsStage, "data-stage");
        const resMaterial = getItems(calcItemsMaterial, "data-material");
        total = +resStage * +resMaterial * (+calcInputPlot.value*79000 + +calcInputHouse.value*100000);
        total = Math.round(total/1000)*1000;
        return total;
    }
    calcResult.textContent = getCalcResult().toLocaleString();
    function getDynamicInputs(input) {
        input.addEventListener("input", () => {
            calcResult.textContent = getCalcResult().toLocaleString();
            changePromoPrice();
        });
    }
    getDynamicInputs(calcInputPlot);
    getDynamicInputs(calcInputHouse);
    




    // promo
    const prevPrice = document.querySelector(".promo_price_prev"),
          newPrice = document.querySelector(".promo_price_new");
    function changePromoPrice() {
        prevPrice.innerHTML = `
            <div class="promo_price_prev_line"></div>
            <span>${getCalcResult().toLocaleString()}</span>
        `;
        newPrice.innerHTML = (getCalcResult()*0.9).toLocaleString() + " р.";
    }
    changePromoPrice();
    


    // timer
    const dateEnd = new Date (2024, 3, 3),
          timerMonth = document.querySelector("[data-timerMonth]"),
          timerDay = document.querySelector("[data-timerDay]"),
          timerHour = document.querySelector("[data-timerHour]"),
          timerMinute = document.querySelector("[data-timerMinute]"),
          timerSecond = document.querySelector("[data-timerSecond]");

    function changeTimer() {
        const now = new Date(),
              t = Date.parse(dateEnd) - Date.parse(now);
        if (t <= 0) {
            timerSecond.textContent = 0;
            timerMonth.textContent = 0;
            timerDay.textContent = 0;
            timerHour.textContent = 0;
            timerMinute.textContent = 0;
            timerSecond.textContent = 0;
            clearInterval(timerInt);
        }
        timerSecond.textContent = Math.floor(t/1000);
        timerMonth.textContent = Math.floor(t/1000/60/60/24/30);
        timerDay.textContent = Math.floor(t/1000/60/60/24) % 30;
        timerHour.textContent = Math.floor(t/1000/60/60) % 24;
        timerMinute.textContent = Math.floor(t/1000/60) % 60;
        timerSecond.textContent = Math.floor(t/1000) % 60;
    }
    changeTimer();
    const timerInt = setInterval(changeTimer, 1000);
    




    // slider
    const sliderImages = document.querySelectorAll(".slider_img"),
          sliderNavLeft = document.querySelector(".slider_nav_left"),
          sliderNavRight = document.querySelector(".slider_nav_right");

    sliderNavLeft.addEventListener("click", () => {
        for (let i = sliderImages.length-1; i>=0; i--) {
            if (sliderImages[i].classList.contains("slider_img_active")) {
                sliderImages[i].classList.remove("slider_img_active");
                if (i == 0) {
                    sliderImages[sliderImages.length-1].classList.add("slider_img_active");
                    break;
                } else {
                    sliderImages[i-1].classList.add("slider_img_active");
                    break;
                }
            }
        }
    });
    sliderNavRight.addEventListener("click", () => {
        for (let i=0; i<sliderImages.length; i++) {
            if (sliderImages[i].classList.contains("slider_img_active")) {
                sliderImages[i].classList.remove("slider_img_active");
                if (i == sliderImages.length-1) {
                    sliderImages[0].classList.add("slider_img_active");
                    break;
                } else {
                    sliderImages[i+1].classList.add("slider_img_active");
                    break;
                }
            }
        }
    });





    // form
    const forms = document.querySelectorAll("form"),
          message = {
            loading: "img/spinner.svg",
            success: "Данные отправились. Ожидайте звонка в ближайшее время",
            failure: "Что-то пошло не так"
          };

    forms.forEach(form => {
        postData(form);
    });

    function postData(form) {
        function showInfoModal(message) {
            const prevModalContent = document.querySelector(".modal_content");
            prevModalContent.style.display = "none";
            showModal();
            const messageModal = document.createElement("div");
            messageModal.classList.add("modal_content");
            messageModal.innerHTML = `
                <div class="modal_close">&times;</div>
                <div class="modal_title">${message}</div>
            `;
            document.querySelector(".modal").append(messageModal);
            setTimeout(() => {
                messageModal.remove();
                prevModalContent.style.display = "";
                hideModal();
            }, 3500);
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const messageStatus = document.createElement("img");
            messageStatus.src = message.loading;
            messageStatus.style.cssText = "display: block; margin: 0 auto";
            form.append(messageStatus);

            const formData = new FormData(form);

            fetch("server.php", {
                method: "POST",
                body: formData
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showInfoModal(message.success);
                messageStatus.remove()
            }).catch(() => {
                showInfoModal(message.failure);
                messageStatus.remove()
            }).finally(() => {
                form.reset();
            })
        });
    }


});