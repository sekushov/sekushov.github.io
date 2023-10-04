import {changePromoPrice} from "./promo";

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
                changePromoPrice();
            });
        });
    }
    changeActiveItem(calcItemsStage, "calc_item_active");
    changeActiveItem(calcItemsMaterial, "calc_item_active");

    calcResult.textContent = getCalcResult().toLocaleString();
    function getDynamicInputs(input) {
        input.addEventListener("input", () => {
            calcResult.textContent = getCalcResult().toLocaleString();
            changePromoPrice();
        });
    }
    getDynamicInputs(calcInputPlot);
    getDynamicInputs(calcInputHouse);
}
export default  calc;
export {getCalcResult};