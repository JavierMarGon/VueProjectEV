<template>
    <!-- <form @submit.prevent="handleRegister" class="mt-6">
        <div class="mb-4">
        <label for="name" class="block text-gray-700">Nombre:</label>
        <input type="text" id="name" v-model="formData.name" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"/>
        </div>

        <div class="mb-4">
        <label for="lastname" class="block text-gray-700">Apellido:</label>
        <input type="text" id="lastname" v-model="formData.lastname" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"/>
        </div>

        <div class="mb-4">
        <label for="email" class="block text-gray-700">Correo Electrónico:</label>
        <input type="email" id="email" v-model="formData.email" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"/>
        </div>

        <div class="mb-4">
        <label for="phone" class="block text-gray-700">Teléfono:</label>
        <input type="text" id="phone" v-model="formData.phone" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"/>
        </div>

        <div class="mb-4">
        <label for="username" class="block text-gray-700">Nombre de Usuario:</label>
        <input type="text" id="username" v-model="formData.username" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"/>
        </div>

        <div class="mb-4">
        <label for="password" class="block text-gray-700">Contraseña:</label>
        <input type="password" id="password" v-model="formData.password" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"/>
        </div>

        <div class="mb-4">
        <label for="date" class="block text-gray-700">Fecha de Nacimiento:</label>
        <input type="date" id="date" v-model="formData.date" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"/>
        </div>

        <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Registrar
        </button>
    </form> -->
  <div class="container mt-4">
    <div class="card p-4 shadow">
      <h2 class="text-center text-primary">Registro</h2>
      <form @submit.prevent="handleRegister">
        <div v-for="(value, key) in formData" :key="key" class="mb-3">
          <label :for="key" class="form-label">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</label>
          <input :type="key === 'password' ? 'password' : 'text'" :id="key" v-model="formData[key]" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success w-100">Registrar</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import apiServices from '@/services/apiServices';
const formData = ref({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    date: ''
  });
  
  // Función para formatear la fecha
  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };
  
  // Función para manejar el registro
  const handleRegister = async () => {
    try {
      const result = await apiServices.postRegister(
        formatDate(formData.value.date),
        formData.value.email,
        formData.value.lastname,
        formData.value.name,
        formData.value.password,
        formData.value.phone,
        formData.value.username
      );
  
      if (result.success) {
        console.log("Registro exitoso!");
        window.location.href="/";// Ocultar el formulario después de registrar
      } else {
        console.log("Error en el registro");
      }
    } catch (error) {
      console.log("Hubo un error al registrar al usuario");
    }
  };
</script>