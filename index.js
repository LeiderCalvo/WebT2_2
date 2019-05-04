    
const express = require('express');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'store';
const client = new MongoClient(url);
var db = null;
 
client.connect(function(err){
    if(err){
      console.error(err);
      return;
    }
  
    db = client.db(dbName);
});

app.use(express.static('public'));
app.engine('handlebars', hbs());
app.set('view engine','handlebars');

app.get('/', function (request, response) {
    response.render('home');
});

app.get('/store', function(request,response){
    const coleccion = db.collection('productos');
    
    coleccion.find({}).toArray(function(err,docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        }
        docs.sort(function(a, b){return 0.5 - Math.random()});

        var contexto = {
            tipos: [{tipo: "ENTRADAS", array:docs.filter(doc => doc.tipo == "ENTRADA")},{tipo: "DISFRACES", array:docs.filter(doc => doc.tipo == "DISFRAZ")},{tipo: "ACCESORIOS", array:docs.filter(doc => doc.tipo == "MASCARA")},{tipo: "TE PUEDE INTERESAR", array:docs.slice(3,6)}],
            productos: docs 
        };
        response.render('store', contexto);
        //response.send(contexto.productos);
    });
});

app.get('/store/estilo', function(request,response){
    const coleccion = db.collection('productos');
    var estilo = request.query.style;

    coleccion.find({
        estilo:{
            '$eq' : estilo
        }
    }).toArray(function(err,docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        }
        docs.sort(function(a, b){return 0.5 - Math.random()});

        var contexto = {
            tipos: [{tipo: "ENTRADAS", array:docs.filter(doc => doc.tipo == "ENTRADA")},{tipo: "DISFRACES", array:docs.filter(doc => doc.tipo == "DISFRAZ")},{tipo: "ACCESORIOS", array:docs.filter(doc => doc.tipo == "MASCARA")},{tipo: "TE PUEDE INTERESAR", array:docs.slice(3,6)}],
            productos: docs 
        };
        response.render('store', contexto);
        //response.send(contexto.productos);
    });
});

app.get('/store/precio', function(request,response){
    const coleccion = db.collection('productos');
    var precio = request.query.precio;

    coleccion.find({
        precio:{
            '$gt' : parseInt(precio)
        }
    }).toArray(function(err,docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        }
        docs.sort(function(a, b){return 0.5 - Math.random()});

        var contexto = {
            tipos: [{tipo: "ENTRADAS", array:docs.filter(doc => doc.tipo == "ENTRADA")},{tipo: "DISFRACES", array:docs.filter(doc => doc.tipo == "DISFRAZ")},{tipo: "ACCESORIOS", array:docs.filter(doc => doc.tipo == "MASCARA")},{tipo: "TE PUEDE INTERESAR", array:docs.slice(3,6)}],
            productos: docs 
        };
        response.render('store', contexto);
        //response.send(contexto.productos);
    });
});


app.get('/detalle', function(request, response){
    const coleccion = db.collection('productos');
    var prod = request.query.producto;
    coleccion.find({}).toArray(function(err, doc){
        if(err){
            console.log(err);
            response.send(err);
            return;
        } 
        doc.sort(function(a, b){return 0.5 - Math.random()});

        coleccion.find({
            nombre:{
                '$eq': prod
            }
        }).toArray(function(err,docs){
            if(err){
                console.log(err);
                response.send(err);
                return;
            }
    
            var contexto = {
                productos: doc.slice(3,6),
                producto: docs
            };
            response.render('detalle', contexto); 
        //response.send(contexto.producto);
        });
    });
});

app.get('/checkout', function(request, response){
    const coleccion2 = db.collection('productos');
    const coleccion = db.collection('carrito');
    coleccion.find({}).toArray(function(err, docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        } 

        coleccion2.find({}).toArray(function(err,doc){
            if(err){
                console.log(err);
                response.send(err);
                return;
            }
            doc.sort(function(a, b){return 0.5 - Math.random()});
    
            var contexto = {
                productos: doc.slice(3,6),
                array: docs
            };
            response.render('checkout', contexto);
            //response.send(contexto.array);
        });
    });
});

app.post('/api/AgregarAlCarrito', function(request, response){
    const coleccion = db.collection('productos');
    const coleccion2 = db.collection('carrito');
    let titulo = request.body.titulo;
    let cant = request.body.cantidad;

    coleccion.find({
        nombre:{
            '$eq' : titulo
        }
    })
    .toArray(function(err, doc){ 
        if(err){
            console.log(err);
            response.send(err);
            return;
        } 
        for (let i = 0; i < parseInt(cant); i++) {
            console.log("insertò"+doc);
            coleccion2.insert(doc);
        }
    });
});

app.post('/api/addSolicitud', function (request, response) {
    const coleccion = db.collection('solicitudes');
    const coleccion2 = db.collection('carrito');
    
    coleccion2.find({}).toArray(function(err, docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        } 
 
        coleccion.insert({
            cuenta: Math.random()*20000000 + 5098590,
            cedula: Math.random()*20000000 + 5098590,
            direccion: "Icesi la manda mas",
            nombre: "Usuario actual",
            productos: docs
        });
        response.send("Nueva solicitud creada");
    });

});

Handlebars.registerPartial('foot', `<div>
<h2>CONTACTENOS</h2>
<h2>TERMINOS DE USO</h2>
<h2>COPYRIGHT Y MARCA REGISTRADA</h2>
<h2>POLÍTICAS DE PREVACIDAD</h2>
<h2>DERECHOS DE CA</h2>
<h2>UBICADOS EN LOS ANGELES CA</h2>
</div>`);

Handlebars.registerPartial('advert',
`<section class="advert">
    <h2>ADVERTENCIA</h2>
    <p> Este evento no es recomendado para <br />personas menores a los 13 años de edad</p>
</section>`);

Handlebars.registerPartial('header', `<section class="menu">
<div class="hamburguesa">
    <img src="/Imagenes/T2/MOVIL/menu.png" alt="" style="width: 100%;">
</div>
<div class="logo">
    <img src="/Imagenes/T2/MOVIL/logo.png" style="width: 100%;" alt="">
</div>

<h2 class="nav">ATRACCIONES</h2>
<h2 class="nav">GALERIA</h2>
<h2 class="nav">PLANEA TU EXPERIENCIA</h2>

<div class="shop">
    <img src="/Imagenes/T2/MOVIL/carrito.png" alt="" style="width: 100%;">
</div>
</section>`);

Handlebars.registerPartial('recomendados', `<h1 class="interes">Te puede interesar</h1>
<div class="content">
    {{#each productos}}
    <div data-name={{nombre}} class="producto">
        <article>
            <img src="/{{url}}" alt="{{nombre}}" style="width: 100%;">
        </article>
        <h2>{{nombre}}</br>$ {{precio}}</h2>
    </div>
    {{/each}}
</div>`);


app.listen(5500);