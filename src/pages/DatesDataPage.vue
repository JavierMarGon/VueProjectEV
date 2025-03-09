<template>
    <div>
  
      <!-- Selección de Centro -->
      <h3>Selecciona un centro de salud</h3>
      <select v-model="selectedCenter">
        <option disabled value="">Selecciona un centro</option>
        <option v-for="(center, index) in centers" :key="index" :value="center.name">
            {{ center.name }}
        </option>
      </select>
      <div v-if="selectedCenter">
          <!-- Selector de Fecha -->
          <h3>Selecciona una fecha</h3>
          <Datepicker 
          v-model="selectedDate"
          :enable-time-picker="false" 
          :min-date="new Date()"
          :disabled-dates="unavailableDates"
          @update:modelValue="openTimeGrid" />
      </div>
      
  
      <!-- Cuadrícula de Horas -->
      <div v-if="showTimeGrid">
        <h3>Selecciona una hora</h3>
        <div class="grid">
          <button 
            v-for="hour in availableHours" 
            :key="hour" 
            @click="selectTime(hour)"
            :class="{ selected: selectedTime === hour }"
          >
            {{ hour.slice(0, 5) }} <!-- Mostrar solo HH:mm -->
          </button>
        </div>
        <p v-if="selectedTime">Hora seleccionada: {{ selectedTime.slice(0, 5) }}</p>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted, computed, onBeforeMount, watch } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import apiServices from '@/services/apiServices';

// Estado
const centers = ref([]);
const selectedDate = ref(null);
const selectedTime = ref('');
const selectedCenter = ref('');
const unavailableTimes = ref([]);
const showTimeGrid = ref(false);

onBeforeMount(async ()=>{
    await apiServices.getCenters();
    centers.value = JSON.parse(sessionStorage.getItem("centers"));
    console.log(centers.value);
});
// Cargar horas bloqueadas desde sessionStorage
onMounted(() => {

});

// Función para abrir la cuadrícula de horarios
const openTimeGrid = () => {
    if (selectedDate.value) {
        showTimeGrid.value = true;
    }
};
const checkAvailable = async ()=>{
    unavailableTimes.value=[];
    const pickedDates= await apiServices.getDatesByDay(selectedDate.value.toLocaleDateString('es-ES'),selectedCenter.value);
        pickedDates.forEach(date => {
            unavailableTimes.value.push(date.date.split(' ')[1]);
        });
};
watch(selectedCenter,(newValue,oldValue)=>{
    if (newValue!==oldValue) {
        if (selectedDate.value) {
            checkAvailable();
        }
    }
})
watch(selectedDate, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        checkAvailable();
    }
});
const allHours = computed(() => {
  const hours = [];
  for (let i = 8; i < 20; i++) {
    hours.push(`${i.toString().padStart(2, '0')}:00:00`);
  }
  return hours;
});

// Filtrar las horas disponibles
const availableHours = computed(() => {
  return allHours.value.filter(hour => !unavailableTimes.value.includes(hour));
});


// Seleccionar hora
const selectTime = (hour) => {
  selectedTime.value = hour;
};
</script>



<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 5px;
}

button.selected {
  background-color: #4caf50;
  color: white;
}

button:hover {
  background-color: #ddd;
}
</style>
