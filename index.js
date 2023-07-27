'use strict'
//Arath Olmedo Hernandez
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hbs = require('express-handlebars');
const router = require('./routers/routes');

const app = express()

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//Body  parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Recursos Estaticos Publicos
app.use('/static', express.static ('public'))

//Motor de Vistas
app.engine('.hbs',hbs.engine({
    defaultLayout : 'index',
    extname : '.hbs'
}))
app.set('view engine', '.hbs')

//Router our app
app.use('/', router)

// Conexion a la Base de datos
mongoose.connect(config.db, config.urlParser, (err,res) =>{
    if(err){
        return console.log(`Error al conecctar en la base de datos ${err}`)
    }

    console.log('Conexion a la BD exitosa')

    app.listen(config.port, ()=>{
        console.log(`Ejecutando en http://localhost:${config.port}`)
    })
}) //Arath Olmedo Hernandez