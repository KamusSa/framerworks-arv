<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Formulario</h2>
        <form class="mid-form" @submit.prevent = "mostrarUsuario()">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model= "user.nombre" />
            <div v-if= "submitted && !$v.user.nombre.required">Este campo es obligatorio</div>
            <div v-if= "submitted && !$v.user.nombre.minLength">Este campo debe tener mas caracteres</div>
          </div>

          <div class="form-group">
            <label for="apellidos">Apellidos</label>
            <input type="text" name="apellidos" v-model= "user.apellidos" />
            <div v-if= "submitted && !$v.user.apellidos.required">Este campo es obligatorio</div>
            <div v-if= "submitted && !$v.user.apellidos.minLength">Este campo debe tener mas caracteres</div>
          </div>

          <div class="form-group">
            <label for="bio">Biografia</label>
            <textarea name="bio" v-model= "user.bio"></textarea>
            <div v-if= "submitted && !$v.user.bio.required">Este campo es obligatorio</div>
            <div v-if= "submitted && !$v.user.bio.minLength">Este campo debe tener mas caracteres</div>
            
          </div>

          <div class="form-group radibuttons">
            <input type="radio" name="genero" value="hombre"  v-model= "user.genero"/> Hombre
            <input type="radio" name="genero" value="mujer" v-model= "user.genero" /> Mujer
            <input type="radio" name="genero" value="otro" v-model= "user.genero" /> Otro
          </div>

          <div class="clearfix"></div>

          <input type="submit" value="Enviar" class="btn btn-success" />
        </form>

        <div class= "datos" v-if= "user.nombre && user.apellidos">
          {{user.nombre + ' ' + user.apellidos}}
        </div>

      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>


<script>
import {required, minLength} from 'vuelidate/lib/validators';

import Sidebar from "./Sidebar.vue";

export default {
  name: "Formulario",
  components: {
    Sidebar,
  },
 
  validations: {
    user: {
      nombre: {
        required,
        minLength: minLength(2)  
      },
      apellidos: {
        required,
        minLength: minLength(2)  
      },
      bio: {
        required,
        minLength: minLength(12)  
      }
    }
    
  },
  data(){
    return {
      
      submitted: false,
      user: {
        nombre: '',
        apellidos: '',
        bio: '',
        genero: ''
      }
    }    
  },
  methods: {
    mostrarUsuario(){
      console.log(this.user);
      this.submitted = true; 

      this.$v.$touch();
      if(this.$v.$invalid){
        return false; 
      }

      alert('Validacion pasada.')
    }
  }  
};
</script>
