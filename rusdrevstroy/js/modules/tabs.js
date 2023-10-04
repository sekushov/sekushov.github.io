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
export default tabs;