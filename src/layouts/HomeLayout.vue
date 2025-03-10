<!-- <template>
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
        <router-view /> 
      </main>
    </div>
  </template> -->
  <template>
    <div class="container-fluid bg-light min-vh-100">
      <header class="bg-primary py-3">
        <nav class="container d-flex justify-content-between">
          <div>
            <button v-if="!isLoggedIn" @click="$router.push('/login')" class="btn btn-outline-light me-2">Login</button>
            <button v-if="!isLoggedIn" @click="$router.push('/register')" class="btn btn-outline-light">Registro</button>
          </div>
          <div>
            <button v-if="isLoggedIn" @click="$router.push('/user')" class="btn btn-light me-2">Datos Usuario</button>
            <button v-if="isLoggedIn" @click="$router.push('/date')" class="btn btn-light me-2">Datos Fechas</button>
            <button v-if="isLoggedIn" @click="logout" class="btn btn-danger">Cerrar Sesión</button>
          </div>
        </nav>
      </header>
      <main class="container py-4">
        <router-view />
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