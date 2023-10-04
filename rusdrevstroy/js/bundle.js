/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getCalcResult: () => (/* binding */ getCalcResult)
/* harmony export */ });
/* harmony import */ var _promo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./promo */ "./js/modules/promo.js");


function getCalcResult() {
    const calcItemsStage = document.querySelectorAll("[data-stage]"),
          calcItemsMaterial = document.querySelectorAll("[data-material]"),
          calcInputPlot = document.querySelector("[data-input-plot]"),
          calcInputHouse = document.querySelector("[data-input-house]");
    let total;
    if (!calcInputPlot.value || !calcInputHouse.value || calcInputPlot.value < 1 || calcInputHouse.value < 1) {
        total = 0;
        return total;
    }
    function getItems(items, attribute) {
        let result;
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

function calc() {
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
                (0,_promo__WEBPACK_IMPORTED_MODULE_0__.changePromoPrice)();
            });
        });
    }
    changeActiveItem(calcItemsStage, "calc_item_active");
    changeActiveItem(calcItemsMaterial, "calc_item_active");

    calcResult.textContent = getCalcResult().toLocaleString();
    function getDynamicInputs(input) {
        input.addEventListener("input", () => {
            calcResult.textContent = getCalcResult().toLocaleString();
            (0,_promo__WEBPACK_IMPORTED_MODULE_0__.changePromoPrice)();
        });
    }
    getDynamicInputs(calcInputPlot);
    getDynamicInputs(calcInputHouse);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function form() {
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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)();
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
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)();
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu() {
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hideModal: () => (/* binding */ hideModal),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });
const modalWindow = document.querySelector(".modal");
function showModal() {
    modalWindow.style.display = "flex";
    document.body.style.overflow = "hidden";
}
function hideModal() {
    modalWindow.style.display = "none";
    document.body.style.overflow = "";
}

function modal() {
    const modalTriggers = document.querySelectorAll(".modal_trigger");

    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            showModal();
        });
    });
    modalWindow.addEventListener("click", (e) => {
        if(e.target === modalWindow || e.target.classList.contains("modal_close")) {
            hideModal();
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/promo.js":
/*!*****************************!*\
  !*** ./js/modules/promo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changePromoPrice: () => (/* binding */ changePromoPrice),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc */ "./js/modules/calc.js");


function changePromoPrice() {
    const prevPrice = document.querySelector(".promo_price_prev"),
          newPrice = document.querySelector(".promo_price_new");
    prevPrice.innerHTML = `
        <div class="promo_price_prev_line"></div>
        <span>${(0,_calc__WEBPACK_IMPORTED_MODULE_0__.getCalcResult)().toLocaleString()}</span>
    `;
    newPrice.innerHTML = ((0,_calc__WEBPACK_IMPORTED_MODULE_0__.getCalcResult)()*0.9).toLocaleString() + " р.";
}
changePromoPrice();

function promo(endDate) {
    const dateEnd = new Date (endDate),
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promo);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({image, imageActive, navLeft, navRight}) {
    const sliderImages = document.querySelectorAll(image),
          sliderNavLeft = document.querySelector(navLeft),
          sliderNavRight = document.querySelector(navRight);

    sliderNavLeft.addEventListener("click", () => {
        for (let i = sliderImages.length-1; i>=0; i--) {
            if (sliderImages[i].classList.contains(imageActive)) {
                sliderImages[i].classList.remove(imageActive);
                if (i == 0) {
                    sliderImages[sliderImages.length-1].classList.add(imageActive);
                    break;
                } else {
                    sliderImages[i-1].classList.add(imageActive);
                    break;
                }
            }
        }
    });
    sliderNavRight.addEventListener("click", () => {
        for (let i=0; i<sliderImages.length; i++) {
            if (sliderImages[i].classList.contains(imageActive)) {
                sliderImages[i].classList.remove(imageActive);
                if (i == sliderImages.length-1) {
                    sliderImages[0].classList.add(imageActive);
                    break;
                } else {
                    sliderImages[i+1].classList.add(imageActive);
                    break;
                }
            }
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_promo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/promo */ "./js/modules/promo.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








document.addEventListener("DOMContentLoaded", () => {
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_promo__WEBPACK_IMPORTED_MODULE_5__["default"])("2024, 3, 3");
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        image: ".slider_img",
        imageActive: "slider_img_active",
        navLeft: ".slider_nav_left",
        navRight: ".slider_nav_right"
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map