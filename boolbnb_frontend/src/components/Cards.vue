<script>
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { RouterLink, RouterView } from 'vue-router'
import { useUtilityStore } from '@/stores/utilityStore'
import { useApiStore } from '@/stores/apiStore'

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
            image_loaded: false,
            utility_store: useUtilityStore(),
            api_store: useApiStore(),
        }
    },
    methods: {
        capitalize(word) {
            let arr_from_word = word.split("")
            arr_from_word[0] = arr_from_word[0].toUpperCase();
            return arr_from_word.join("")
        }
    }

})
</script>

<template>

    <div class="card pb-6 relative">
        <Carousel class="w-full aspect-square" :wrap-around="true" v-show="this.image_loaded">
            <Slide @click="$emit('goToSingleAccomodation')" v-for="slide in prop_accomodation?.pictures" :key="slide"
                class="w-full aspect-square cursor-pointer">
                <img class="rounded-md w-full h-full" :src="slide.url" :alt="slide.name" @load="() => {
                    this.image_loaded = true
                }">
            </Slide>

            <template #addons>
                <Navigation class="z-[10000]" />
                <!-- <Pagination /> -->
            </template>
        </Carousel>
        <div class="w-full aspect-square bg-gray-200" v-show="!this.image_loaded"></div>

        <div @click="$emit('goToSingleAccomodation')" class="flex items-start justify-between mt-4 cursor-pointer">
            <h2 class="font-semibold text-sm">{{ capitalize(prop_accomodation?.title) }}</h2>
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
            <div class="flex gap-2 items-center">
                <p class="text-[#5E5E5E] text-sm">{{ prop_accomodation?.rooms }} bedrooms</p>
                    -
                <p class="text-[#5E5E5E] text-sm">{{ prop_accomodation?.beds }} beds</p>
            </div>
            <p class="font-semibold text-sm mt-1">€ {{ prop_accomodation?.price_per_night }} <span
                    class="font-normal">night</span></p>
        </div>

        <div class="w-7 absolute top-4 left-4 p-1 bg-white/70 rounded-full" v-show="prop_accomodation?.has_ad">
            <img src="/other-icons/sponsored-accommodation.svg" alt="">
        </div>
    </div>

</template>

<style scoped>
.card {
    width: calc(100% / 1);
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

@media (min-width: 550px) {
    .card {
        width: calc(100% / 2 - 8px);
    }
}

@media (min-width: 745px) {
    .card {
        width: calc(100% / 3 - 10px);
    }
}

@media (min-width: 950px) {
    .card {
        width: calc(100% / 4 - 12px);
    }
}

@media (min-width: 1127px) {
    .card {
        width: calc(100% / 5 - 12px);
    }
}
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