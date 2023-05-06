let express=require('express'); //importamos express
const mongoose = require('mongoose'); // importamos mongoose para poder realizar la coneccion con mongodb Atlas

//Rutas
let personsRoutes = require('./src/routes/person');//definimos una variable para usar nuestra ruta que se encuentra en otra carpeta

mongoose.Promise = global.Promise;
let app=express(); //Definimos una variable para usar express
let port=process.env.PORT || 3000; //
require('dotenv').config(); //dotenv permite usar las variables de entorno creados por nosotros

//Configuraciones
mongoose.connect(process.env.MONGODB).then(()=>console.log("Base en linea")).catch((err)=>console.log(err)); //con la funcion connect de mongoose pegamos nuestra variable de entorno que creamos y si conecta con exito mostramos un mensaje y si no mostramos el error

app.use('/assets', express.static(__dirname+'/public'));
app.use(express.urlencoded({extended: false})) // Esta linea de codigo hara que nos permita pasear en caso de no tenerla marcara error al momento de querer mostrar resultados
app.set('view engine', 'ejs'); // Usamos el motor de vistas ejs para poder mostrar nuestras views
app.use('/',(req, res, next) => {
    console.log('Request URL:' + req.url);
    next()
});

//Redireccion
app.use(personsRoutes); // Llamamos a la variable que seleccionamos para nuestras rutas de persons

app.listen(port,()=>{console.log("Servidor en linea")}); // Inicamos el server


