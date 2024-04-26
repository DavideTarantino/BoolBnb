<script>
export default {
    name: 'Cards',
    props: ['prop_accomodation'],
    data() {
        return {
            image_loaded: false
        }
    }
}
</script>

<template>
    <div class="card" v-show="image_loaded">
        <figure id="thumb-container" class="w-full aspect-square">
            <img class="rounded-md w-full h-full" :src="prop_accomodation.thumb" alt="thumb"
                @load="image_loaded = true">
        </figure>
        <div>
            <div class="title flex items-center justify-between">
                <h2 class="text-base font-semibold">{{ prop_accomodation.address }}</h2>
                <div class="rating flex items-center text-sm gap-1">
                    <i class="fa-solid fa-star"></i>
                    <span>
                        {{ prop_accomodation.rating }}
                    </span>
                </div>
            </div>
            <div v-if="prop_accomodation.distance_from_point"> {{ prop_accomodation.distance_from_point.toFixed(1) }} km
            </div>
            <p>{{ prop_accomodation.type }}</p>
            <p class="font-semibold"> {{ prop_accomodation.price_per_night }} € night</p>
        </div>
    </div>

    <div class="card" v-show="!image_loaded">
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
    width: calc((100% - 20rem) / 5);
}

figure img {
    object-fit: cover;
}

.card h2 {
    word-break: normal;
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