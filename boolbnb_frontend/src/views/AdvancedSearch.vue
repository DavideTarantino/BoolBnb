<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <main>
        <div class="py-24 w-6/12" style="margin: 0 auto;">
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
                    <div class="flex items-center justify-center gap-8 pt-6">
                        <input type="number" class="border-2 border-black py-4 pr-56 pl-2 rounded" placeholder="Minimum">
                        <input type="number" class="border-2 border-black py-4 pr-56 pl-2 rounded" placeholder="Maximum">
                    </div>
                    <hr class="my-8">
                    <p class="text-2xl"><strong>Rooms and beds</strong></p>
                    <div>
                        <p class="pt-4">Bedrooms</p>
                        <div class="flex">
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">Any</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">1</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">2</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">3</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">4</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">5</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">6</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">7</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">8+</p>
                            </div>
                        </div>
                        <p class="pt-4">Beds</p>
                        <div class="flex">
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">Any</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">1</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">2</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">3</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">4</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">5</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">6</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">7</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">8+</p>
                            </div>
                        </div>
                        <p class="pt-4">Bathrooms</p>
                        <div class="flex">
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">Any</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">1</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">2</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">3</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">4</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">5</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">6</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">7</p>
                            </div>
                            <div class="p-2">
                                <p class="check-button px-8 py-2 border-2 rounded-full">8+</p>
                            </div>
                        </div>
                    </div>
                    <hr class="my-8">
                </div>
            </div>
        </div>
    </main>
</template>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none; 
  margin: 0;
}

.check-button:hover{
    color: white;
    background-color: black;
    cursor: pointer;
}
</style>