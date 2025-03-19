<template>
  <loadingComponent v-if="loading"></loadingComponent>
  <div v-else class="container mt-4">
    
    <nav class="mb-4 d-flex flex-column align-items-center gap-3">
      <h1 class="text-primary text-center">Gestión de citas</h1>
      <div v-if="!onWork" class="d-flex gap-3">
        <button @click="processingSaveDate" class="btn btn-info btn-lg">Pedir Cita</button>
        <button @click="processingViewDate" class="btn btn-info btn-lg">Ver Citas</button>
      </div>
    </nav>
    <div v-if="saveDateProcess" class="card p-4">
      <button @click="killTask" class="btn custom-danger">Cancelar solicitud</button>
      <h3 class="mt-3">Selecciona un centro de salud</h3>
      <select v-model="selectedCenter" class="form-select">
        <option disabled value="">Selecciona un centro</option>
        <option v-for="(center, index) in centers" :key="index" :value="center.name">{{ center.name }}</option>
      </select>
      <div v-if="selectedCenter" class="mt-3">
        <h3>Selecciona una fecha</h3>
        <Datepicker v-model="selectedDate" :enable-time-picker="false" :min-date="new Date()" :disabled-dates="unavailableDates" @update:modelValue="openTimeGrid" class="form-control" />
      </div>
      <div v-if="showTimeGrid" class="mt-3">
        <h3>Selecciona una hora</h3>
        <div class="d-flex flex-wrap">
          <button v-for="hour in availableHours" :key="hour" @click="selectTime(hour)" :class="['btn', selectedTime === hour ? 'custom-select' : 'btn-outline-primary', 'm-1']">
            {{ hour.slice(0, 5) }}
          </button>
        </div>
        <p v-if="selectedTime" class="mt-2">Fecha seleccionada: {{ final_date }}</p>
      </div>
      <div v-if="final_date">
        <button @click="saveDate()" class="btn custom-back mt-2">Guardar la cita</button>
      </div>
    </div>
    <div v-if="viewDateProcess" class="card p-4 mt-4">
      <button @click="killTask" class="btn custom-back mb-3">Volver</button>
      <div class="list-group">
        <div v-for="(date, index) in dates" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ date.center }} - {{ date.date }}</span>
          <button @click="cancelDate(date.center, date.date)" class="btn custom-danger">Cancelar cita</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, onBeforeMount, watch } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import apiServices from '@/services/apiServices';
import loadingComponent from '@/components/loadingComponent.vue';

// Estado
const saveDateProcess = ref(false);
const centers = ref([]);
const selectedDate = ref(null);
const selectedTime = ref('');
const selectedCenter = ref('');
const unavailableTimes = ref([]);
const showTimeGrid = ref(false);
const final_date = ref('');
const onWork = ref(false);
const viewDateProcess = ref(false);
const dates= ref([]);
const loading = ref(true);
onBeforeMount(async ()=>{
  loadCenterData();
  loadDatesData();
});
onMounted(() => {
  setTimeout(() => {
      loading.value = false;
    }, 1000);
});
const killTask =()=>{
  onWork.value = false;
  selectedDate.value = null;
  selectedTime.value = '';
  selectedCenter.value = '';
  unavailableTimes.value = [];
  showTimeGrid.value = false;
  final_date.value = '';
  saveDateProcess.value = false;
  viewDateProcess.value = false;
}
const loadDatesData=async()=>{
  await apiServices.getDates();
  dates.value = JSON.parse(sessionStorage.getItem("dates"));
}
const loadCenterData=async()=>{
  await apiServices.getCenters();
  centers.value = JSON.parse(sessionStorage.getItem("centers"));
}
const processingSaveDate =()=>{
  onWork.value=true;
  saveDateProcess.value=true;
}
const processingViewDate =()=>{
  onWork.value=true;
  viewDateProcess.value=true;
}
const cancelDate = async(centerName,dateTimestamp)=>{
  await apiServices.postDateDelete(centerName,dateTimestamp);
  loadDatesData();
  alert('Se ha cancelado la cita en '+centerName+' a las '+dateTimestamp);
}
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
  if (onWork.value) {
    if (newValue!==oldValue) {
      if (selectedDate.value) {
        checkAvailable();
      }
    }
  }
})
watch(selectedDate, (newValue, oldValue) => {
  if (onWork.value) {
    if (newValue !== oldValue) {
        checkAvailable();
    }
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

const saveDate= async()=>{
  loading.value=true;
  await apiServices.postDateCreate(selectedCenter.value,final_date.value);
  killTask();
  sessionStorage.removeItem("dates");
  await loadDatesData();
  setTimeout(() => {
      loading.value = false;
    }, 1000);
  processingViewDate();
}

// Seleccionar hora
const selectTime = (hour) => {
  selectedTime.value = hour;
  final_date.value = selectedDate.value.toLocaleDateString('es-ES')+" "+selectedTime.value;
  console.log(final_date.value);
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
