<template>
  <div class="general">
    <div class="center">
    
      <section id="content">
        <h1 class="subheader">Peliculas</h1>

        <div class="mis-datos" v-if="misDatos">
          <p v-html="misDatos"></p>
          <br/>
          {{ web | mayusculas | concatenaYear('Promocion en mes en curso')}}
        </div>

        <div class="favorita" v-if= "favorita">
          
          La pélicula marcada es: <h3>{{favorita.title}}</h3>
        </div>
        
        
        <!--Listado articulos-->
        <div id="articles">
          <div v-for= "pelicula in peliculasMayuscula" v-bind:key = "pelicula.title">
            <Pelicula 
              :pelicula= "pelicula"
              @favorita= "haLlegadoLaPeliculaFavorita"
            ></Pelicula>
          </div>
        </div>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Pelicula from './Pelicula.vue'

export default {
    name: 'Peliculas',
    components: {
      Pelicula,
      Sidebar,
    },
    methods: {
      haLlegadoLaPeliculaFavorita(favorita){
        this.favorita = favorita
      }
    },

    filters: {
      mayusculas(value){
        return value.toUpperCase();
      },
      concatenaYear(value, message){
        var date = new Date();
        return value + ' ' + date.getFullYear() + ' ' + message;
      }
    },

    computed: {
      peliculasMayuscula(){

        var peliclasMod = this.peliculas;

        for(var i = 0; i < this.peliculas.length; i++){
          peliclasMod[i].title = peliclasMod[i].title.toUpperCase();
        }        
        return peliclasMod
      },

      misDatos(){
      return this.nombre + ' ' + this.apellido + '<br/>Sitio Web: ' + this.web + '<br/>';
      
      },
    },
    
    data(){
        return{
          nombre: 'Luis',
          apellido: 'Aguilar',
          web: 'luis.es/systemsoft',
          favorita: null,
          peliculas: [
            {title: 'Batman vs Superman', year: 2019, image: "https://i1.wp.com/www.vinilonegro.com/wp-content/uploads/2016/03/Batman-v-Superman-3-e1459165974655.jpg?fit=600%2C400&ssl=1"},
            {title: 'Spiderman', year: 2012, image: "https://as.com/meristation/imagenes/2019/10/15/noticias/1571137562_437495_1571137608_noticia_normal.jpg"},
            {title: 'Breaking Bad', year: 2020, image: "https://cdn.cienradios.com/wp-content/uploads/sites/3/2019/08/breaking-bad-peli%CC%81cula.jpg"},    
          ]
        }
    }
}
</script>
