<template>
    <div class="general">
    <Slider
        texto= 'Página de Prueba'
    ></Slider>
        <div class="center">
            <section id="content">
                <h2 class="subheader">Página de Prueba</h2>
                <h2>{{ id_desde_url }}</h2>
              <button @click="actualizarNombre()">Actualizar Nombre</button><br>
                <button @click="redirigirBlog()">Redirigir al Blog</button>
                <hr/>
                <h4>{{nombre}}</h4>
            </section>
            <Sidebar></Sidebar>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
import Slider from './Slider.vue'
import Sidebar from './Sidebar.vue'

export default {
    name: "Pagina",
    components: {
    Slider,
    Sidebar
    },
    
    created(){
        console.log('Componente creado');
    },
    mounted(){
        this.id_desde_url= this.$route.params.id;
        console.log('Componente montado');
    },
    updated(){
        console.log('Componente actualizado');
        
    },
    destroyed(){
        console.log('Componente eliminado');
    },
    data(){
        return{
            id_desde_url: null,
            nombre: 'Luis Antonio Aguilar'
            
        }
    },

    methods: {
        actualizarNombre(){
            this.nombre = 'LUIS ANTONIO AGUILAR'
            console.log(this.nombre);
        },

        redirigirBlog(){
            this.$router.push('/blog'); 
        }
    },
    
}
</script>
