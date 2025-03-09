<template>
    <h1>Hola clínica</h1>
  
    <!-- Botones a la izquierda -->
    <div class="absolute top-4 left-4 flex space-x-4">
      <button
        v-if="!isLoggedIn"
        @click="goToLogin"
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Iniciar Sesión
      </button>
      <button
        v-if="!isLoggedIn"
        @click="toggleRegisterForm"
        class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
      >
        Registrarse
      </button>
  
      <button
        v-if="isLoggedIn"
        @click="logout"
        class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
      <button
        v-if="isLoggedIn"
        class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
      >
        Usuario
      </button>
    </div>
  
    <!-- Estado de Autenticación -->
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center text-gray-700">Estado de Autenticación</h2>
        <p class="mt-4 text-lg text-center" v-if="isLoggedIn">✅ Estás logueado</p>
        <p class="mt-4 text-lg text-center" v-else>❌ No estás logueado</p>
      </div>
    </div>
  
    <!-- Formulario de Registro (centrado en pantalla) -->
    <div
      v-if="showRegisterForm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <button @click="toggleRegisterForm" class="absolute top-2 right-2 text-gray-600 hover:text-red-600">
          ✖
        </button>
        <h2 class="text-2xl font-semibold text-center text-gray-700">Registro de Usuario</h2>
  
        <!-- Formulario -->
        <form @submit.prevent="handleRegister" class="mt-6">
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
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import apiServices from '@/services/apiServices';
  
  const router = useRouter();
  const isLoggedIn = ref(false);
  const showRegisterForm = ref(false);
  
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
        showRegisterForm.value = false; // Ocultar el formulario después de registrar
      } else {
        console.log("Error en el registro");
      }
    } catch (error) {
      console.log("Hubo un error al registrar al usuario");
    }
  };
  
  // Función para verificar autenticación
  const checkAuth = () => {
    isLoggedIn.value = sessionStorage.getItem("token") !== null;
  };
  
  // Cerrar sesión
  const logout = () => {
    sessionStorage.removeItem("token");
    isLoggedIn.value = false;
  };
  
  // Redirigir a /login
  const goToLogin = () => {
    router.push('/login');
  };
  
  // Mostrar/Ocultar formulario de registro
  const toggleRegisterForm = () => {
    showRegisterForm.value = !showRegisterForm.value;
  };
  
  onMounted(() => {
    checkAuth();
  });
  </script>
  