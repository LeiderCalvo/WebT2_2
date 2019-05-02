window.addEventListener('load', function () {
    let slider = document.querySelector('.interaccion__slider');
    let img = document.querySelector('.interaccion__img');

    slider.oninput = function () {
        //console.log(slider.value);

        if (slider.value >= 50) {
            img.src = "/Imagenes/interaccion2.jpg";
            img.style.opacity = parseInt((slider.value - 50)*2)/100;
        } else {
            img.src = "/Imagenes/interaccion.jpg";
            img.style.opacity = Math.abs((slider.value*2) - 100) /100;
        }
    }
});