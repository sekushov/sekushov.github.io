import {getCalcResult} from "./calc";

function changePromoPrice() {
    const prevPrice = document.querySelector(".promo_price_prev"),
          newPrice = document.querySelector(".promo_price_new");
    prevPrice.innerHTML = `
        <div class="promo_price_prev_line"></div>
        <span>${getCalcResult().toLocaleString()}</span>
    `;
    newPrice.innerHTML = (getCalcResult()*0.9).toLocaleString() + " р.";
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
export default promo;
export {changePromoPrice};