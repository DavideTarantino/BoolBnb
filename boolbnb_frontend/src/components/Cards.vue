<script>
export default {
    name: 'Cards',
    props: ['prop_accomodation'],
    data() {
        return {}
    }
}
</script>

<template>
    <div class="card">
        <figure id="thumb-container" class="w-full aspect-square">
            <img class="rounded-md w-full h-full" :src="prop_accomodation.thumb" alt="thumb">
        </figure>
        <div>
            <div class="title flex items-center justify-between">
                <h2 class="text-base font-semibold">{{ prop_accomodation?.address }}</h2>
                <div class="rating flex items-center text-sm gap-1">
                    <i class="fa-solid fa-star"></i>
                    <span>
                        {{ prop_accomodation?.rating }}
                    </span>


                </div>
            </div>

            <p>{{ prop_accomodation?.type }}</p>
            <p class="font-semibold"> {{ prop_accomodation?.price_per_night }} € night</p>
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