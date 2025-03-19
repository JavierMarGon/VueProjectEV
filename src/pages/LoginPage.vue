  <template>
    <loadingBar v-if="loading"></loadingBar>
    <div v-else class="d-flex justify-content-center align-items-center vh-90 bg-light">
      <div class="card p-4 shadow">
        <h2 class="text-center text-primary">Inicia sesión</h2>
        <img class="img-fluid" src="../assets/images/Logo.png">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  import apiServices from '@/services/apiServices';
  import loadingBar from '../components/loadingComponent.vue';
  const username = ref('');
  const password = ref('');
  const loading =ref(true);
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  const handleLogin = async () => {
    loading.value = true;
    const result = await apiServices.postLogin(username.value,password.value);
    setTimeout(() => {
      loading.value = false;
    }, 1000);
    if (result.success) {
      await apiServices.getProfile();
      window.location.href="/";
    } else {
        errorMessage.value = result.error;
    }
  };
  </script>