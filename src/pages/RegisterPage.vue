<template>
  <loadingBar v-if="loading"></loadingBar>
  <div v-else class="container mt-4">
    <div class="card p-4 shadow">
      <h2 class="text-center text-primary">Gracias por elegirnos - Rellene sus datos</h2>
      <form @submit.prevent="handleRegister">
        <div v-for="(value, key) in formData" :key="key" class="mb-3">
          <label :for="key" class="form-label">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</label>
          <Datepicker
            v-if="key === 'date'"
            v-model="formData[key]"
            class="form-control"
            :max-date="new Date()"
            :enable-time-picker="false"
            placeholder="Seleccione su fecha de nacimiento"
          />
          <input v-if="key !== 'date'" :type="key === 'password' ? 'password' : 'text'" :id="key" v-model="formData[key]" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success w-100">Registrar</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import apiServices from '@/services/apiServices';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import loadingBar from '@/components/loadingComponent.vue'
const formData = ref({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    date: ''
  });
  const loading =ref(true);
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  // Función para formatear la fecha

  
  // Función para manejar el registro
  const handleRegister = async () => {
    loading.value = true;
    try {
      const result = await apiServices.postRegister(
        formData.value.date.toLocaleDateString('es-ES'),
        formData.value.email,
        formData.value.lastname,
        formData.value.name,
        formData.value.password,
        formData.value.phone,
        formData.value.username
      );
      console.log(result);
      setTimeout(() => { 
        loading.value = false;
      }, 1000);
      if (result.success) {
        console.log("Registro exitoso!");
        window.location.href="/";// Ocultar el formulario después de registrar
      } else {
        console.log("Error en el registro");
      }
    } catch (error) {
      console.log("Hubo un error al registrar al usuario ", error);
    }
  };
</script>