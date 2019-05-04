var x= document.querySelectorAll(".producto");
  
  for (let i = 0; i < x.length; i++) {
     x[i].addEventListener('click', function (params) {
         var name = x[i].getAttribute('data-name');
         console.log(name);
         window.location.href = "/detalle/?producto="+name;
     });
  }

  var y= document.querySelector(".logo");
  y.addEventListener('click', function (params) {
      window.location.href = "/";
  });

  var j= document.querySelector(".centrador");
  j.addEventListener('click', function (params) {
    fetch(`/api/addSolicitud`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${name}`,
    }).then(function (respuesta) {
        return respuesta.text();
    }).catch(function (error) {
        console.error(error);
    }).then(function (mensaje) {
        console.log(mensaje);
    });
    window.location.href = "/store";
});