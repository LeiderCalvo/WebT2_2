   window.addEventListener('load', function (params) {
       var x = document.querySelectorAll('.btnAñadir');
       
       for (let i = 0; i < x.length; i++) {
           x[i].addEventListener('click', function (params) {
            var name = x[i].getAttribute('data-name');
            var cant = document.querySelector(".cantidad").value;

            fetch(`/api/AgregarAlCarrito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `titulo=${name}&cantidad=${cant}`,
            }).then(function (respuesta) {
                return respuesta.text();
            }).catch(function (error) {
                console.error(error);
            }).then(function (mensaje) {
                console.log(mensaje);
            });

            window.location.href = "/checkout";
        });
    }
   });