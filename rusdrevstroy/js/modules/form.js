import {showModal, hideModal} from "./modal";

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
}
export default form;