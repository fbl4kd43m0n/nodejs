var mysql = require('mysql');
var dateFormat = require('dateformat');

//productos controller

module.exports = {

	//funciones del controlador
	
	getProductos : function(req, res, next){
    var config = require('.././database/config');
    
    var db = mysql.createConnection(config);
    db.connect();
    
    var productos = null;
    
    db.query('SELECT * FROM productos', function(err, rows, fields){
      if(err) throw err;
      
      productos = rows;
      db.end();
      
      res.render('productos/productos', {productos : productos});
      
    });

	},
  
  getNuevoProducto : function(req, res, next){
    res.render('productos/nuevo');
  },
  
  postNuevoProducto : function(req, res, next){
    
    var fechaactual = new Date();
    var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');
    
    var producto = {
      nombre : req.body.nombre,
      precio : req.body.precio,
      stock : req.body.stock,
      fecha_creacion : fecha
    }
    
    var config = require('.././database/config');
    
    var db = mysql.createConnection(config);
    db.connect();
    
    db.query('INSERT INTO productos SET ?', producto, function(err, rows, fields){
      if(err) throw err;
      
      db.end();
    });//evitando SQL Injection
    
    res.render('productos/nuevo', {info : 'Produto criado corretamente'});
    
    //console.log(producto);
    
    //console.log(req.body);
  },
  
  eliminarProducto : function(req, res, next){
    var id = req.body.id;
    
    var config = require('.././database/config');
    
    var db = mysql.createConnection(config);
    db.connect();
  
    var respuesta = {res: false};
    
    db.query('DELETE FROM productos WHERE id_producto = ?', id, function(err, rows, fields){
        if(err)throw err;

        db.end();
        respuesta.res = true;

        res.json(respuesta);
    });
  
  },
  
  getModificarProducto : function(req, res, next){			
	   var id = req.params.id;// cuando se envia parametros por get se envia por params
	   var config =require('.././database/config');;
	 //  console.log(id);
	   var db = mysql.createConnection(config);
	   db.connect();

     var producto = null;
		 db.query('SELECT * FROM  productos WHERE id_producto = ?',id, function(err,rows,fields){
				if(err) throw err;
				producto = rows;
				db.end();
	      
        res.render('productos/modificar', {producto: producto});
		});
  },
  
  postModificarProducto : function(req, res, next){			
		  var producto = {
        nombre : req.body.nombre,
        precio : req.body.precio,
        stock : req.body.stock
      };
		   
		  var config = require('.././database/config');
  
		  var db = mysql.createConnection(config);
		  db.connect();
 
		  db.query('UPDATE productos SET ? WHERE ?', [producto,{id_producto: req.body.id_producto}], function(err,rows,fields){
					if(err) throw err;			
					db.end();
		           
			});

		  res.redirect('/productos');
		}

}