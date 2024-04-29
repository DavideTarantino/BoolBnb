<template>
    <div id="map" class="h-screen w-screen" v-show="utility_store.show_map">

    </div>
</template>

<script>

import { useApiStore } from '@/stores/apiStore'
import { useUtilityStore } from '@/stores/utilityStore'

export default {
    data() {
        return {
            api_store: useApiStore(),
            utility_store: useUtilityStore(),

        }
    },
    mounted() {

    }
}
</script>

<style scoped></style>