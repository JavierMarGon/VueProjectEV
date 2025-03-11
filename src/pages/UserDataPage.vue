<!-- <template>
    <div>
        <h1>Bienvenido al área cliente {{ userData.username }}</h1>
        <ul>
            <li><strong>Nombre:</strong> <input v-model="editableData.name" :disabled="!isEditing" /></li>
            <li><strong>Apellido:</strong> <input v-model="editableData.lastname" :disabled="!isEditing" /></li>
            <li><strong>Email:</strong> <input v-model="editableData.email" :disabled="!isEditing" /></li>
            <li><strong>Teléfono:</strong> <input v-model="editableData.phone" :disabled="!isEditing" /></li>
            <li><strong>Fecha de nacimiento:</strong> <input v-model="editableData.date" :disabled="!isEditing" /></li>
        </ul>
        <button @click="toggleEdit">{{ isEditing ? 'Cancelar' : 'Editar' }}</button>
        <button v-if="isEditing" @click="saveChanges">Guardar cambios</button>
    </div>
</template> -->
<template>
  <div class="container mt-4">
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
const userData = ref({ username: "", name: "", lastname: "", email: "", phone: "", date: "" });
const editableData = ref({});
const isEditing = ref(false);

onBeforeMount(async ()=>{
});
onMounted(()=>{
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
        userData.value = JSON.parse(storedUser);
        editableData.value = { ...userData.value };
    } else {
        console.warn("No se encontraron datos de usuario en sessionStorage.");
    }
});
const toggleEdit = () => {
    if (isEditing.value) {
        editableData.value = { ...userData.value }; // Restaurar valores originales si se cancela
    }
    isEditing.value = !isEditing.value;
};
const saveChanges = async() => {
    userData.value = { ...editableData.value }; 
    isEditing.value = false;
    await apiServices.patchUserData(userData.value.date.toLocaleDateString('es-ES'),userData.value.email,userData.value.lastname,userData.value.name, userData.value.phone);
    sessionStorage.removeItem("user");
    sessionStorage.setItem("user", JSON.stringify(userData.value));
};
</script>