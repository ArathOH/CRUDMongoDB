/*jshint esversion 8*/
const Product = require("../models/product");

module.exports = (req, res) => {
  let datoBusqueda = req.params.productId;
  //Buscamos con dato busqueda y arrojamos o un error o el producto que estamo buscando
  Product.findById(datoBusqueda, (err, product) => {
    //esto en caso que nos de error
    if (err)
      return res.status(500).send({
        message: `Error al borrar un producto ${err}`,
      });

    product.remove((err) => {
      if (err)
        return res.status(500).send({
          message: `Error al borrar un producto ${err}`,
         });    
          // res.status(200).send({
          //    message: 'El Producto ha sido eliminado' 
          // });
          res.redirect('/api/product');  
    });

  });
};
