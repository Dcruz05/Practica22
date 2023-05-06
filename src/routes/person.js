let express = require('express');
let router = express.Router(); //usamos export.Router para solo usar router para hacer ruteo
const mongoose = require('mongoose');
let Person = require('../models/person'); // importamos nuestro esquema de personas que creamos en models

router.post('/personJson',express.json({type:'*/*'}),(req,res)=>{
    console.log(`Nombre: ${req.body.Nombre}\nApellido: ${req.body.Apellido}`)  //Mostramos la informacion que recibimos por medio de una vista ejs en este caso testJson en este caso la informacion de un Json
});

router.get('/',async (req,res)=>{ //Definimos como index la tabla de persons
    let data = await Person.find({}); // Crear una consulta a mongo
    res.render('index', {data})
    //res.json(items); //Imprimimos el resultado de la busqueda en formato json
});

router.get('/student',  (req, res) => {
    res.render('student'); // creamos una nueva vista ejs para recibir datos
});

router.post('/addStudent', (req, res) => { //Cuando usamos el metodo Post tambien debemos usarlo con express
    const persona = Person({"Nombre":req.body.nombre,"Edad":req.body.edad,"Nss":req.body.nss,"TpSangre":req.body.tpSangre})
    
    persona.save().then(()=>{res.redirect('/');}); // Con este comando podemos guardar el nuevo documento en mongoDB atlas y si todo sale bien entonces nos rediecciona a index
    //res.render('displayData',{Nombre:req.body.nombre,Edad: req.body.edad, NSS: req.body.nss, TpSangre:req.body.tpSangre}); // cambiamos res.send por render para mostrar los datos en un hmtl y mandamos los datos con res.body
})
router.get('/findById/:id', (req, res)=>{ // buscar por ID para mostrarnos un formulario donde pasamos la informacion de nuestro documento y la mostramos par poderla editar
    Person.findById(req.params.id).then((myPerson)=>{res.render('personUpdate',{myPerson})}).catch((err)=>{res.json({message:err});})
})
router.post('/updatePerson', (req, res)=>{ //cuando presionamos el boton de modificar del formulario personsUpdate nos debe redireccionar a updatePersons por el metodo post para poder hacer los cambios desde aqui
    Person.findByIdAndUpdate(req.body.objId, //Buscar por Id y actulizar actualizando los valores de las llaves
        {
            Nombre:req.body.nombre,
            Edad:req.body.edad,
            TpSangre:req.body.tpSangre,
            Nss:req.body.nss
        })
        .then((data)=>{res.redirect('/')}) //Al terminar de actualizar nos redirige a index
        .catch((err)=>{
            res.json({message: err}) //Si hay error mostrar el error en un json
        });
})

module.exports = router; //exportamos el router para poder acceder a la ruta en server.js