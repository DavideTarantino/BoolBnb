<template>
    <div id="map" class="w-screen h-screen">

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
            center: [13.769474, 41.906025],
            map: undefined
        }
    },
    mounted() {
        // Initialize the map
        this.map = tt.map({
            key: this.api_store.tom_api_key,
            container: 'map',
            zoom: 6,
            center: this.center
        });

        // Wait for the map to load fully
        this.map.on('load', () => {
            this.utility_store.map_istance = this.map
        });
    }
}
</script>

<style scoped></style>