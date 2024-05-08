<template>
    <main>
        <div
            class="px-4 bg-white box flex ml-20 mb-20 flex-col gap-2 items-center py-32 justify-center text-center relative container">
            <p class="text-3xl"><strong>Thank you</strong></p>
            <img @click="closeMessageHost" src="../../other-icons/close-icon.svg" class="top-3 left-3 text-4xl cursor-pointer w-10 absolute"alt="">
            <div>
                <p><strong>Your message has been sent successfully</strong></p>
                <p class="text-sm">The Host we'll see your message shortly</p>
            </div>
            <div class="gradient p-6 rounded-full mt-4">
                <img class="w-14 h-14" src="../../public/other-icons/check.svg" alt="">
            </div>

        </div>
    </main>
</template>

<script>
import { useUtilityStore } from '@/stores/utilityStore';

export default {
    name: 'MessageFeedback',
    data() {
        return {
            utility_store: useUtilityStore(),
        }
    },
    methods:{
        closeMessageFeedback(){
            this.utility_store.showMessageFeedback = false;
        }
    }
}
</script>

<style scoped>
.box {
    height: 400px;
    width: 420px;
}

.gradient {
    background: linear-gradient(135deg, #00CBD8, #B844FF);
}

.container{
    width: 350px;
    position: fixed;
    z-index: 12;
    left: 30%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    max-height: 90vh;
    border-radius: 20px;
}

@media (min-width: 550px) {
    .container{
    width: 450px;
    overflow: hidden;
    position: fixed;
    z-index: 12;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    max-height: 90vh;
    border-radius: 20px;
}
}

@media (min-width: 745px) {
    .container{
    width: 450px;
    overflow: hidden;
    position: fixed;
    z-index: 12;
    left: 42%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    max-height: 90vh;
    border-radius: 20px;
}
}

@media (min-width: 950px) {
    .container{
    width: 450px;
    overflow: hidden;
    position: fixed;
    z-index: 12;
    left: 44%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    max-height: 90vh;
    border-radius: 20px;
}
}
</style>