<script>
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
    name: 'Cards',
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    props: ['prop_accomodation'],
    data() {
        return {
            image_loaded: false
        }
    }
})
</script>

<template>

    <div class="card pb-6">
        <Carousel class="w-full aspect-square" :wrap-around="true">
            <Slide v-for="(slide, index) in prop_accomodation?.pictures" :key="index" class="w-full aspect-square">
                <img class="rounded-md w-full h-full" :src="slide.url" :alt="slide.name" @load="() => {
                    image_loaded = true
                }">
            </Slide>

            <template #addons>
                <Navigation />
                <div class="overflow-hidden w-4">
                    <!-- <Pagination /> -->
                </div>
            </template>
        </Carousel>

    <RouterLink to="/Single_Accomodation">
        <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold">{{ prop_accomodation?.address }}</h2>
            <div class="rating flex items-center text-sm gap-1">
                <i class="fa-solid fa-star"></i>
                <span class="text-sm">
                    {{ prop_accomodation?.rating }}
                </span>
            </div>
        </div>
        <div>
            <div v-if="prop_accomodation.distance_from_point"> {{ prop_accomodation.distance_from_point.toFixed(1) }} km
            </div>
            <p class="text-[#5E5E5E] text-sm">{{ prop_accomodation?.type }}</p>
            <p class="font-semibold text-sm mt-2">€ {{ prop_accomodation?.price_per_night }} <span
                    class="font-normal">night</span>
            </p>
        </div>
    </RouterLink>
    </div>

    <div class="card pb-6" v-if="!image_loaded">
        <figure id="thumb-container" class="w-full aspect-square">
            <div class="h-full w-full bg-gray-400"></div>
        </figure>
        <div>
            <p class="blur-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officia quasi vel ipsum, velit modi
                voluptates blanditiis molestiae provident incidunt vitae quae dolores similique expedita, illum fugit.
                Ex, maxime atque.
            </p>
        </div>
    </div>

</template>

<style scoped>
.card {
    width: calc(100% / 5 - (15px / 5 + 15px));
}

img {
    object-fit: cover;
}

.card h2 {
    word-break: normal;
}

.fa-star {
    font-size: 12px;
}


/* #thumb-container {
    position: relative;
}

#thumb-container svg {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
} */
</style>

<style>
.card .carousel__pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0;
    gap: 0;
}

.card .carousel__pagination-button::after {
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
}

.card .carousel__pagination-button--active::after {
    background-color: white;
}

.card:hover .carousel__prev {
    display: flex;
}

.card:hover .carousel__next {
    display: flex;
}

.card .carousel__prev,
.carousel__next {
    box-sizing: content-box;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: var(--vc-nav-width);
    height: var(--vc-nav-height);
    text-align: center;
    font-size: 15px;
    padding: 0;
    color: var(--vc-nav-color);
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 0;
    cursor: pointer;
    margin: 0 10px;
    top: 50%;
    transform: translateY(-50%);
}

.card .carousel__prev:hover,
.carousel__next:hover {
    background: white;
    color: black;
}
</style>