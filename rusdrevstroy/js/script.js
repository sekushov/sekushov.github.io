import menu from "./modules/menu";
import modal from "./modules/modal";
import form from "./modules/form";
import tabs from "./modules/tabs";
import calc from "./modules/calc";
import promo from "./modules/promo";
import slider from "./modules/slider";

document.addEventListener("DOMContentLoaded", () => {
    menu();
    modal();
    form();
    tabs();
    calc();
    promo("2024, 3, 3");
    slider({
        image: ".slider_img",
        imageActive: "slider_img_active",
        navLeft: ".slider_nav_left",
        navRight: ".slider_nav_right"
    });
});