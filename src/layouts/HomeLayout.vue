<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <header class="bg-primary py-3">
      <nav class="container d-flex justify-content-between align-items-center">
        <button @click="$router.push('/')" class="btn">
          <img class="logo-textless me-auto" src="../assets/images/LogoTextless.png" alt="">
        </button>
        <div class="d-flex">
          <div v-if="!isLoggedIn" class="me-3">
            <button @click="$router.push('/login')" class="btn btn-outline-light me-2">Login</button>
            <button @click="$router.push('/register')" class="btn btn-outline-light">Registro</button>
          </div>
          <div v-if="isLoggedIn" class="d-flex align-items-center">
            <button @click="$router.push('/user')" class="btn btn-light me-2">Datos Usuario</button>
            <button @click="$router.push('/date')" class="btn btn-light me-2">Datos Fechas</button>
            <button @click="logout" class="btn btn-danger">Cerrar Sesión</button>
          </div>
        </div>
      </nav>
    </header>
    <main class="container py-4 flex-grow-1">
      <router-view />
    </main>
    <footer class="bg-primary text-white text-center py-3">
      &copy; 2025 Hospital Sanidad Total - Todos los derechos reservados
    </footer>
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