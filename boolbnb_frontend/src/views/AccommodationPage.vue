<template>
    <div>
        <NavBar />

        <div class="pt-8 pr-32 pl-32">
            <div class="flex items-center gap-3">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.16666L4.66667 8.5L10 13.8333" stroke="#222222" stroke-width="1.77778" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h1 class="text-2xl font-medium">Titolo accommodation</h1>
            </div>
        </div>

    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

    export default {
        data() {
            return {
                title: 'Accommodation',
            }
        },
        components: { 
            NavBar
        },
    }
</script>

<style lang="scss" scoped>

</style>