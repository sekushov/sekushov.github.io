document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger"),
        menu = document.querySelector(".menu"),
        menuLink = document.querySelectorAll(".menu_link");
    hamburger.addEventListener("click", () => {
        if (!hamburger.classList.contains("hamburger_active")) {
            hamburger.classList.add("hamburger_active");
            menu.classList.add("menu_active");
        } else {
            hamburger.classList.remove("hamburger_active");
            menu.classList.remove("menu_active");
            
        }
    });
    menuLink.forEach(item => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("hamburger_active");
            menu.classList.remove("menu_active");
        });
    })
    

});