    
const express = require('express');
const hbs = require('express-handlebars');
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
            tipos: [{tipo: "ENTRADAS", array:docs.filter(doc => doc.tipo == "entrada")},{tipo: "DISFRACES", array:docs.filter(doc => doc.tipo == "disfraz")},{tipo: "ACCESORIOS", array:docs.filter(doc => doc.tipo == "mascara")},{tipo: "TE PUEDE INTERESAR", array:docs.slice(3,6)}],
            productos: docs 
        };
        response.render('store', contexto);
        //response.send(contexto.productos);
    });
});

app.get('/detalle', function(request, response){
    const coleccion = db.collection('productos');
    var prod = request.query.producto;
    coleccion.find({
        nombre:{
            '$eq': prod
        }
    }).toArray(function(err, docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        } 

        var contexto = {producto: docs};
        response.render('detalle', contexto); 
        //response.send(contexto.producto);
    });
});

app.listen(5500);