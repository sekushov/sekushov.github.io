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
export default modal;
export {showModal, hideModal};