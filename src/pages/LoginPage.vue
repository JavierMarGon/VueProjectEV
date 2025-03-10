<!-- <template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-600">Username</label>
            <input v-model="username" type="text" class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-600">Password</label>
            <input v-model="password" type="password" class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <button type="submit" class="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  </template> -->
  <template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card p-4 shadow">
        <h2 class="text-center text-primary">Login</h2>
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
  import { ref } from 'vue';
  import apiServices from '@/services/apiServices';
  import { RouterLink} from 'vue-router';
  const username = ref('');
  const password = ref('');
  
  const handleLogin = async () => {
    console.log('Username:', username.value);
    console.log('Password:', password.value);
    
    const result = await apiServices.postLogin(username.value,password.value)
    if (result.success) {
      await apiServices.getProfile();
      window.location.href="/";
    } else {
        errorMessage.value = result.error;
    }
  };
  </script>