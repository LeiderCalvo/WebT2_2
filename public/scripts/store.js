
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
});
