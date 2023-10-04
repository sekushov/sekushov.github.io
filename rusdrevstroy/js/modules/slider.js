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
export default slider;