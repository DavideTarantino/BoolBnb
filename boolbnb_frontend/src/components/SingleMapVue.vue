<template>

    <div id="single-map" class="w-[800px] h-[400px] mt-4">

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