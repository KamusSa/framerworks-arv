'use strict'

var validator = require('validator');
const article = require('../models/article');

var Article = require('../models/article'); 
var fs = require('fs');
var path = require('path');
const { REFUSED } = require('dns');

var controller = {
  
  // Datos de prueba y ejemplo
  datosCurso: (reqs, resp)=>{
     
    var hola = reqs.body.hola;
  
    return resp.status(200).send({
      
      "curso": "Master Maqueta Web",
      "autor": "Luis Aguilar",
      "url": "luis@gmail.com",
      hola
  
    });
  },
  
  // Datos de prueba y ejemplo
  test: (reqs, resp) => {
    return resp.status(200).send({
      message: 'Soy la accion del controller article'
    });
  },

  // metodo para salvar
  save: (reqs, resp)=>{
    // Recoger parametros por POST (lo que el usuario envie desde la petición (formulario))
    var params = reqs.body;
    console.log(params);

    // Validar datos (Validator)
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content)

    } catch (error) {
      return resp.status(404).send({
        status: 'error',
        message: 'Faltan datos por enviar'
      });
    }

    if (validate_title && validate_content){
      // Crear el objeto a guardar
      var article = new Article();

    // Asignar valor al objeto
      article.title = params.title; 
      article.content = params.content;

      if(params.image){
        article.image = params.image;
      } else { 
        article.image = null; 
      }
      

    //   if(params.image){
    //     article.image = params.image;
    //   }else{
    //     article.image = null;
    //   }
      
      // Guardar el articulo

      article.save((err, articleStored)=>{
        // Si se produce un error o no se ha guardado anda
        if (err || !articleStored){ 
          return resp.status(404).send({
            status: 'error',
            message: 'El articulo no se ha guardado '
          });
        }
        // Devolver respuesta
        return resp.status(200).send({
          status: 'success',
          article: articleStored
        });
      });
      
    } 
    else {
      return resp.status(404).send({
        status: 'error',
        message: 'Los datos nos son validos ',
        article: params
      });
    }
  },

  // metodo para obtener todos los articulos
  getArticles: (req, res) =>{
    // Find -> para sacar los datos de la base de datos
    // Se utiliza vacio para obtener todo find({})

    var query = Article.find({});

    var last = req.params.last;
    // console.log(last);
    if ( last || last != undefined){
      query.limit(5);
    }
    
    query.sort('-_id').exec((err, articles) =>{
  
      if(err){
        return res.status(500).send({
          status: 'error',
          message: 'Error al devolver los artículos'
        });
      }

      if(!articles){
        return res.status(404).send({
          status: 'error',
          message: 'No existen artículos para mostrar '
        });
      }
      return res.status(200).send({
        status: 'success',
        articles
      });

    });
  },

  // metodo para obtener un articulo
  getArticle: (req, res) => {
    // Recoger el ID del articulo
    var articleId = req.params.id;

    // Validar que existe
    if ( !articleId || articleId == null){
      return res.status(404).send({
        status: 'error',
        message: 'No existe el artículo para mostrar '
      });
    }

    // Buscar el articulo
    Article.findById( articleId, (err, article) => {
      
      if ( err || !article ) {
        return res.status(500).send({
          status: 'error',
          message: 'Error al devolver los datos '
        });
      }
      
      return res.status(200).send({
        status: 'success',
        article
      });
    });    
  },

  // metodo para actualizar un articulo
  update: ( req, res) => {

    // Recoger el id del articulo por la url
    var articleId = req.params.id;
    
    // Recoger los datos que llegan por PUT
    var params = req.body;
    
    //Validar los datos    
    try {
      var validate_title = !validator.isEmpty(params.title);
      var vallidate_content = !validator.isEmpty(params.content);
      
    } catch ( err ) {
      return res.status(404).send({
        status: 'error',
        message: 'Faltan datos por enviar.'
      });
    }

    if ( validate_title && vallidate_content ){
      
      Article.findByIdAndUpdate({_id: articleId}, params, {new: true}, (err, articleUpdate) => {
        if ( err ) {
          return res.status(404).send({
            status: 'error',
            message: 'Error al actualizar.'
          });
        }

        if ( !articleUpdate){
          return res.status(404).send({
            status: 'error',
            message: 'No existe el articulo.'
          });
        }

        return res.status(200).send({
          status: 'success',
          article: articleUpdate
        });

      });

    } else {
      return res.status(404).send({
        status: 'error',
        message: 'La validación no es correcta'
      });
    }
  },

  // metodo para eliminar un articulo
  delete: ( req, res ) => {

    // Recoger el id al eliminar
    var articleId = req.params.id;

    // find and delete
    Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
      if ( err ){
        return res.status(500).send({
          status: 'error',
          message: 'Error al borrar un articulo'
        });
      }

      if (!articleRemoved){
        return res.status(404).send({
          status: 'error',
          message: 'No se ha borrado el articulo, posiblemente no exista'
        });
      }
      return res.status(200).send({
        status: 'success',
        message: articleRemoved
      });
    });   
  },

  // metodo para subir un articulo
  upload: ( req, res ) => {

    var file_name = 'Imagen no subida'

    if(!req.files){
      return res.status(404).send({
        status: 'ERROR',
        message: file_name
      });      
    }

    var file_path = req.files.file0.path;
    var file_split = file_path.split(path.sep);
    
    file_name = file_split[2];
    var extension_split = file_name.split('\.');
    var file_ext = extension_split[1];

    if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif' ){

      fs.unlink(file_path, (err) => {
        return res.status(404).send({
          status: 'ERROR',
          message: 'La extension del archivo no es valida.'
        });
      });

    } else {

      var articleId= req.params.id;

      if(articleId){
        Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, articleUpdated) => {

          if(err || !articleUpdated){
            return res.status(200).send({
              status: 'ERROR',
              message: 'Error al guardar la imagen del articulo.'
            });
          }
  
          return res.status(200).send({
            status: 'success',
            article: articleUpdated
          });
        });
      }
      else {
        return res.status(200).send({
          status: 'success',
          image: file_name
        });        
      }

      
    }    
  },

  // metodo para obtener una imagen
  getImage: (req, res) => {

    var file = req.params.image;
    var path_file = './upload/articles/'+file;

    fs.exists(path_file, (exists) => {
      
      if(exists){

        return res.sendFile(path.resolve(path_file));
        
      }else {
        return res.status(404).send({
          status: 'error',
          message: 'La imagen no existe'
        });
      }
    });
  },
  
  // metodo de busqueda
  search: (req, res) => {

    // Sacar el string a buscar
    var searchString = req.params.search;

    // Find or para hacer varias condiciones 
    Article.find({ "$or": [
      { "title": { "$regex": searchString, "$options": "i"}},
      { "content": { "$regex": searchString, "$options": "i"}}
   ]})
   .sort ([['date', 'descending']])
   .exec ((err, articles) => {

      if ( err ){
        return res.status(500).send({
          status: 'error',
          message: 'Error en la petición'
        });
      }

      if ( !articles || articles.length <= 0){
        return res.status(404).send({
          status: 'error',
          message: 'No hay articulos que coincidan con la busqueda'
        });
      }

      return res.status(200).send({
        status: 'success',
        // searchString
        articles
      });
     });
  },



};

module.exports = controller;