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
export default menu;