<template>
  <loadingComponent v-if="loading"></loadingComponent>
  <div v-else class="container mt-4">
    <h1 class="text-primary">Bienvenido al área cliente: {{ userData.username }}</h1>
    <ul class="list-group">
      <li class="list-group-item">
        <strong>Nombre:</strong> 
        <input v-model="editableData.name" :disabled="!isEditing" class="form-control"/>
      </li>
      <li class="list-group-item">
        <strong>Apellido:</strong> 
        <input v-model="editableData.lastname" :disabled="!isEditing" class="form-control"/>
      </li>
      <li class="list-group-item">
        <strong>Email:</strong> 
        <input v-model="editableData.email" :disabled="!isEditing" class="form-control"/>
      </li>
      <li class="list-group-item">
        <strong>Teléfono:</strong> 
        <input v-model="editableData.phone" :disabled="!isEditing" class="form-control"/>
      </li>
      <li class="list-group-item">
        <strong>Fecha de nacimiento:</strong> 
        <Datepicker
            v-model="editableData.date"
            class="form-control"
            :max-date="new Date()"
            :enable-time-picker="false"
            :placeholder="editableData.date"
            :disabled="!isEditing"
          />
      </li>
    </ul>
    <div class="mt-3">
      <button @click="toggleEdit" class="btn btn-warning me-2">{{ isEditing ? 'Cancelar' : 'Editar' }}</button>
      <button v-if="isEditing" @click="saveChanges" class="btn btn-success">Guardar cambios</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted} from 'vue';
import apiServices from '@/services/apiServices';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import loadingComponent from '@/components/loadingComponent.vue';

const userData = ref({ username: "", name: "", lastname: "", email: "", phone: "", date: "" });
const editableData = ref({});
const isEditing = ref(false);
const loading =ref(true);
onBeforeMount(async ()=>{
  const storedUser = sessionStorage.getItem("user");
  if (!storedUser){
    await apiServices.getProfile();
  }
});
onMounted(()=>{
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
        userData.value = JSON.parse(storedUser);
        editableData.value = { ...userData.value };
    } 
    setTimeout(() => {
      loading.value = false;
    }, 1000);
});
const toggleEdit = () => {
    if (isEditing.value) {
        editableData.value = { ...userData.value }; // Restaurar valores originales si se cancela
    }
    isEditing.value = !isEditing.value;
};
const formatDate = (inputDate) => {
  let date;
  
  if (typeof inputDate === 'string' && inputDate.includes('T')) {
    date = new Date(inputDate);
  } else {
    date = new Date(inputDate);
  }

  if (isNaN(date)) return "Fecha inválida"; 
  const day = date.getUTCDate() +1; 
  const month = date.getUTCMonth() + 1; 
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
const saveChanges = async() => {
    userData.value = { ...editableData.value }; 
    isEditing.value = false;
    await apiServices.patchUserData(formatDate(userData.value.date),userData.value.email,userData.value.lastname,userData.value.name, userData.value.phone);
    sessionStorage.removeItem("user");
    sessionStorage.setItem("user", JSON.stringify(userData.value));
};
</script>