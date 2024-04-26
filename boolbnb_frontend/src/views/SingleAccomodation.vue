<script>
    import NavBar from '../components/NavBar.vue'
    import { RouterLink, RouterView } from 'vue-router'


    export default {
     name: 'SingleAccomodation',
     data(){
        return{}
     },
     components: {NavBar},
    }
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <main class="py-12 px-16">
        <RouterLink to="/"  class="text-2xl"><span><</span> <span>Accomodation Name</span></RouterLink>

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

        <section>
            <div>
                <div>
                    <p class="text-3xl mt-5"><strong>Entire rental unit hosted by Ghazal</strong></p>
                    <figure class="w-14">
                        <img src="https://picsum.photos/id/237/200/300" alt="">
                    </figure>
                </div>
                <div><span>2 guests</span> - <span>1 bedroom</span> - <span>1 bed</span> - <span>1 bath</span></div>
                <div class="flex gap-2 items-center mt-5">
                    <span><svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></span>
                    <span>rating</span>
                </div>
            </div>
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