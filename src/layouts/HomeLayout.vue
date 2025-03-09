<template>
    <div>
      <header>
        <nav>
            <button v-if="isLoggedIn" @click="logout">Cerrar Sesión</button>
            <button v-if="!isLoggedIn" @click="$router.push('/login')">Login</button>
            <button v-if="!isLoggedIn" @click="$router.push('/register')">Registro</button>
            <button v-if="isLoggedIn" @click="$router.push('/user')">Datos Usuario</button>
            <button v-if="isLoggedIn" @click="$router.push('/date')">Datos Fechas</button>
        </nav>
      </header>
  
      <main>
        <router-view /> <!-- Aquí se mostrará la página activa -->
      </main>
    </div>
  </template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import apiServices from '@/services/apiServices';
  const isLoggedIn = ref(false);
  const checkAuth = () => {
    isLoggedIn.value = sessionStorage.getItem("token") !== null;
  };
  
  // Cerrar sesión
  const logout = () => {
    sessionStorage.clear();
    window.location.href="/"
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