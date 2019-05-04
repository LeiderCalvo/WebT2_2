var x= document.querySelectorAll(".producto");
  
  for (let i = 0; i < x.length; i++) {
     x[i].addEventListener('click', function (params) {
         var name = x[i].getAttribute('data-name');
         console.log(name);
         window.location.href = "/detalle/?producto="+name;
     });
  }