<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <main>
        <div class="py-24 px-96">
            <div class="border-2 h-screen relative">
                <p class="py-8 text-center"><strong>Filters</strong></p>
                <RouterLink class="absolute top-1 left-2" to="/">X</RouterLink>
                <hr>
                <div class="px-10 py-10">
                    <p class="text-2xl"><strong>Distance from your search</strong></p>
                    <p>Extend your search</p>
                    <div>

                    </div>
                    <hr class="my-8">
                    <p class="text-2xl"><strong>Price range</strong></p>
                    <p>Nightly prices including fees and taxes</p>
                    <div>
                        <input type="number" class="border-2 py-4 pr-28 pl-2 rounded" placeholder="Minimum"> - <input type="number" class="border-2 py-4 pr-28 pl-2 rounded" placeholder="Maximum">
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style>

</style>