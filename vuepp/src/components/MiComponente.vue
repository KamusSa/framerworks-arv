<template>
    <section id="content">
    <h2 class="subheader">{{ titulo }}</h2>
        <hr/>
        <h1>Este en un nuevo componente</h1>
        <h2>{{subtitulo}}</h2>
        <hr/>
        <h2>Reactividad</h2>
        <input type="text" v-model="nombre" />
        Mi nombre es: <strong>{{nombre}}</strong>
        <pre>
            {{$data}}
        </pre>

        <hr>
        <h2>Directivas Condicionales</h2>
        <input type="number" v-model="edad" /><br>
        Mi edad es: <strong>{{edad}}</strong><br>

        <p class="alert-success-provisional" v-if = "edad && edad >= 18 && edad < 65">
            Eres mayor de edad!!!
        </p>

        <p class="alert-purple-provisional" v-else-if = "edad && edad >= 65">
            Eres una persona muy mayor de edad!!!
        </p>

        <!-- <p class="alert-danger-provisional" v-if="!edad || edad < 18">
            Eres menor de edad!!!
        </p> -->
        <p class="alert-danger-provisional" v-else>
            Eres menor de edad!!!
        </p>

        <hr>
        <h2>Directiva Iterativa (For) </h2>
        <ol>
            <li v-for="pelicula in peliculas" :key="pelicula">{{pelicula}}</li>
        </ol>

        

    </section>

</template>

<script>
    export default {
        name: 'MiComponente',
        data(){
            return{
                titulo: 'Mi Componente desde la propiedad',
                subtitulo: 'Soy el subtitulo del componente',
                nombre: '',
                edad: 18,
                peliculas: [
                    'Batman VS Superman', 'El Señor de los Anillos', 'Spiderman', 'Wolwerine'
                ]
            }
        }
    };
</script>
