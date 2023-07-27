/*jshint esverrsion 6 */

//import modules
const express = require('express');
const res = require('express/lib/response');
const Product = require('../models/product')
const path = require('path');
// const { traceDeprecation } = require('process');

//Create a router object
const router = express.Router();

//export our router
module.exports = router;

//Ir a hOME
router.get('/', (req, res) => {
    res.render('home')
});


//ir al insertar producto
router.get('/insertar', (req, res) => {
    res.render('product')
});


// Consulta de Datos y creando pagina de showproducts
router.get('/api/product', (req, res)=>{
    
    Product.find({}, (err, products) =>{


    if(err) return res.status(500).send({
        message: `Error al realizar la peticion ${err}`
    });

    if(!products) return res.status(404).send({
        message: 'No existen los productos'
    });

    // res.status(200).send({ products: [products] });
    //ir a la ventana de show
    res.render('showproducts', {products});
        
}).lean();

});

//Consulta por filtro
//Arath Olmedo Hernandez

// Dato Busqueda
router.get('/api/product/:datoBusqueda', (req, res) =>{

    let datoBusqueda = req.params.datoBusqueda
    //Cuando pidan borrar se usa elemento ID
  Product.findById(datoBusqueda, (err, todoOK) =>{
   // Product.findOne({price: datoBusqueda}, (err, todoOK) =>{ 
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });
    
        if(!todoOK) return res.status(404).send({
            message: 'No existen los productos'
        });

       // res.status(200).send({ product: todoOK });

        res.render('editar', {products: todoOK})
    }).lean();

});

//Borrar un Registro Metodo DELETE
const delProdouct = require('../controlers/delProdouct');
router.delete('/api/product/:productId', delProdouct); //Puedes mandar cualquier ruta

//modificar producto PUT
const putProduct = require('../controlers/putProdouct');
const { home } = require('nodemon/lib/utils');
router.put('/api/product/:productId', putProduct);

//Insertar Valores
router.post('/api/product', (req, res) =>{

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;    
    product.save((err, productStored) =>{
    
    if (err) return res.status(500).send ({
    message: `Èrror al realizar la petición ${err}`
    });
    
    // res.status(200).send({product:productStored});

    res.redirect('/api/product');  //ir a la ruta de index o inter de api/product

    });
    });

// router.get('/login',(req,res) =>{
//     res.status(200).send('Hola soy la pagina Login');
//     //res.render('home')
// });

router.use((req,res) =>{
    res.render('notfound')
});


