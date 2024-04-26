<script>
    import NavBar from '../components/NavBar.vue'
    import { RouterLink, RouterView } from 'vue-router'


    export default {
     name: 'SingleAccomodation',
     data(){
        return{
            
        }
     },
     components: {NavBar},
    }
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <main class="py-12 px-16">
        <RouterLink to="/" class="flex items-center gap-3">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3.16666L4.66667 8.5L10 13.8333" stroke="#222222" stroke-width="1.77778" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 class="text-2xl font-medium">Titolo accommodation</h1>
        </RouterLink>


<!-- THUMB SECTION -->
        <section class="flex gap-1 all-thumbs mt-5">
            <img class="main-img rounded-l-md" src="https://picsum.photos/id/237/200/300" alt="">
            <div id="side-img-container">
                <div class="flex gap-1 flex-wrap side-img" style="margin-bottom: 0.25rem;">
                    <img src="https://picsum.photos/id/237/200/300" alt="">
                    <img class="rounded-r-md" src="https://picsum.photos/id/237/200/300" alt="">
                </div>
                <div class="flex flex-wrap gap-1 side-img">
                    <img src="https://picsum.photos/id/237/200/300" alt="">
                    <img class="rounded-r-md" src="https://picsum.photos/id/237/200/300" alt="">
                </div>
            </div>
        </section>

<!-- INFO SECTION -->
        <section class="w-8/12 mt-8">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-medium">Entire rental unit hosted by Ghazal</h1>
                <figure class="w-16">
                    <img class="h-16 rounded-full" src="https://picsum.photos/id/237/200/300" alt="">
                </figure>
            </div>
            <div><span>2 guests</span> - <span>1 bedroom</span> - <span>1 bed</span> - <span>1 bath</span></div>
            <div class="flex gap-2 items-center mt-5">
                <span><svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></span>
                <span>rating</span>
            </div>

            <hr class="my-8">

        <!-- SERVICES -->
            <h1 class="text-2xl font-medium">What this place offers</h1>
                <div class="flex flex-wrap mt-8 w-7/12 gap-x-32 gap-y-6">
                    <div class="flex items-center gap-2">
                        <img class="w-8" src="../../public/service-icons/coffee_maker.svg" alt="">
                        <p class="text-lg">Service Name</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img class="w-8" src="../../public/service-icons/coffee_maker.svg" alt="">
                        <p class="text-lg">Service Name</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img class="w-8" src="../../public/service-icons/coffee_maker.svg" alt="">
                        <p class="text-lg">Service Name</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img class="w-8" src="../../public/service-icons/coffee_maker.svg" alt="">
                        <p class="text-lg">Service Name</p>
                    </div>
                </div>

            <!-- BOTTONI DA COMPLETARE CON IL TRIGGER PER IL FUNZIONAMENTO  -->
                <button class="text-blue-500 mt-4">See more</button>
                <button class="text-blue-500 mt-4">See less</button>

                <hr class="my-8">

                <p id="description">descrizione</p>
            <!-- BOTTONI DA COMPLETARE CON IL TRIGGER PER IL FUNZIONAMENTO  -->
                <button class="text-blue-500 mt-4">See more</button>
                <button class="text-blue-500 mt-4">See less</button>

                <hr class="my-8">    
        </section>

    <!-- CALENDAR SECTION -->
        <section class="w-8/12">
            <p>calendario</p>
            <hr class="my-8"> 
        </section>

    <!-- POSITION SECTION -->
        <section class="w-8/12">
            <h1 class="text-2xl font-medium">Where you'll be</h1>
            <p>mappa</p>
            <hr class="my-8"> 
        </section>

        

    </main>
</template>

<style scoped>
    .main-img{
        width: calc(100% / 2);
        height: 400px;
    }

    #side-img-container{
        width: calc(100% / 2);
    }

    .side-img img{
        height: 198px;
        width: calc((100% - 0.25rem) / 2 )
    }
</style>