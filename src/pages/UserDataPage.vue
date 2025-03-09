<template>

</template>
<script setup>
import { ref, onBeforeMount, onMounted} from 'vue';
import apiServices from '@/services/apiServices';

const userData = ref({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    date: ''
  });
const handleUserData = async () => {
    const result = await apiServices.getProfile();
    if (result.success) {
        window.location.href="/";
    } else {
        errorMessage.value = result.error;
    }
};
onBeforeMount(()=>{
    if (!sessionStorage.getItem("user")){
        handleUserData();
    }
});
onMounted(()=>{
    userData.value=sessionStorage.getItem("user");
});
</script>