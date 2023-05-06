const mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
    Nombre:String,
    Edad:String,
    TpSangre:String,
    Nss:String
}); // Creamos un esquema poder crear docuemntos en mongo usando Json como para realizar consultas

module.exports = mongoose.model('Persons', personSchema); //exportarmos el valor 'Persons' para usar el esquema en mongo junto a nuestro esquema