// requires
const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const exphbs = require('express-handlebars');
const path = require('path');



//inicializar variables
const app = express();

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: 'hbs'
}));
app.set('view engine', '.hbs');


//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//conexion a la bd
mongoose.connection.openUri('mongodb://localhost:27017/InvestDB', (err, res) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos online');
});

//importar rutas
var appRoutes = require('./rutas/app');
var usuarioRoutes = require('./rutas/usuario');
var loginRoutes = require('./rutas/login');
var reporteRoutes = require('./rutas/reporte');


//rutas
app.use('/', appRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/reporte', reporteRoutes);

//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000 online');
});