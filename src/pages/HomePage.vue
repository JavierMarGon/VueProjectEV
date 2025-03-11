<template>
    <header class="bg-primary text-white text-center py-3">
        <h1>Bienvenido a Madrid Salud</h1>
    </header>
    <section class="container my-4 p-4 bg-white shadow rounded">
        <h2 class="text-center mb-4">Últimos Anuncios</h2>
        <div class="alert alert-info" role="alert">
            <strong>Vacunación gratuita</strong> - Disponible hasta el 30 de marzo.
        </div>
        <div class="alert alert-info" role="alert">
            <strong>Nuevo horario de consultas</strong> - De lunes a sábado de 8 AM a 6 PM.
        </div>
    </section>
    <section class="container my-4 p-4 bg-white shadow rounded">
        <h2 class="text-center mb-4">Noticias Destacadas</h2>
        <Splide :options="splideOptions" class="news-carousel">
            <SplideSlide v-for="(noticia, index) in noticias" :key="index">
                <div class="news-slide" :style="{ backgroundImage: `url(${noticia.imagen})` }">
                    <div class="news-text">
                        <h3>{{ noticia.titulo }}</h3>
                        <p>{{ noticia.descripcion }}</p>
                    </div>
                </div>
            </SplideSlide>
        </Splide>
    </section>
    <section class="container my-4 p-4 bg-white shadow rounded">
        <h2 class="text-center mb-4">Nuestros Servicios</h2>
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">Consulta General</h3>
                        <p class="card-text">Atención médica para diagnósticos y tratamientos generales.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">Urgencias 24/7</h3>
                        <p class="card-text">Servicio de emergencias disponible en cualquier momento.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">Pediatría</h3>
                        <p class="card-text">Especialistas en el cuidado de la salud infantil.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import quirofano from '@/assets/images/announcement.jpg';
import hospital from '@/assets/images/Hospital.jpg';
import asistencia from '@/assets/images/asistencia.jpg';

export default {
    components: {
        Splide,
        SplideSlide,
    },
    data() {
        return {
            splideOptions: {
                type: 'loop',
                autoplay: true,
                interval: 9000,
                pauseOnHover: false,
                arrows: true,
                pagination: true,
            },
            noticias: [
                {
                    titulo: 'Nuevo centro en Madrid Sur',
                    descripcion: 'Comprueba la asistencia en los nuevos centros disponibles',
                    imagen: hospital,
                },
                {
                    titulo: 'Quirófanos de última generación',
                    descripcion: 'Atención de lunes a sábado de 8 AM a 6 PM.',
                    imagen: quirofano,
                },
                {
                    titulo: 'Nuevo servicio de asistencia próximamente',
                    descripcion: 'Cuidado especializado para los yayos',
                    imagen: asistencia,
                },
            ],
        };
    },
};
</script>

<style scoped>
.news-carousel {
    max-width: 800px;
    margin: 0 auto;
}

.news-slide {
    position: relative;
    height: 300px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    color: white;
}

.news-text {
    background: rgba(0, 0, 0, 0.6);
    padding: 15px;
    border-radius: 5px;
}
</style>
