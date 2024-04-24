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
        <section class="flex gap-1 all-thumbs">
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