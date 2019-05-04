
window.addEventListener('load', function(){
  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      var content = this.nextElementSibling;
      if (content.style.display === "flex") {
        content.style.display = "none";
      } else {
        content.style.display = "flex";
      }
      this.classList.toggle("active");
    });
  }
  
  
  var x= document.querySelectorAll(".producto");
  for (let i = 0; i < x.length; i++) {
     x[i].addEventListener('click', function (params) {
         var name = x[i].getAttribute('data-name');
         console.log(name);
         window.location.href = "/detalle/?producto="+name;
     });
  }

  var x= document.querySelectorAll(".inp");
  for (let i = 0; i < x.length; i++) {
     x[i].addEventListener('change', function (params) {
         var name = x[i].getAttribute('data-name');
         window.location.href = "/store/estilo/?style="+name;
     });
  }

  var y= document.querySelector(".btnPre");
    y.addEventListener('click', function (params) {
        var pre = document.querySelector(".inpPre").value;
        window.location.href = "/store/precio/?precio="+pre;
    });

  var y= document.querySelector(".shop");
    y.addEventListener('click', function (params) {
        window.location.href = "/checkout";
    });

    var y= document.querySelector(".logo");
    y.addEventListener('click', function (params) {
        window.location.href = "/";
    });

    var y= document.querySelector(".filtros");
    y.addEventListener('mouseout', function (params) {
      var a= document.querySelector(".estilos");
      var b= document.querySelector(".precio");
      var c= document.querySelector(".titu");

      a.style.display = 'none';
      b.style.display = 'none';
      c.style.display = 'none';
    });

    y.addEventListener('mouseover', function (params) {
      var a= document.querySelector(".estilos");
      var b= document.querySelector(".precio");
      var c= document.querySelector(".titu");

      a.style.display = 'flex';
      b.style.display = 'flex';
      c.style.display = 'flex';
    });

    
});
