<template>
    <main>
        <div
            class="w-3/12 box flex border-2 ml-20 mb-20 rounded-lg flex-col gap-2 items-center py-32 justify-center text-center relative">
            <p class="text-3xl"><strong>Thank you</strong></p>
            <p class="absolute top-1 left-2">X</p>
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
export default {
    name: 'MessageFeedback',
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.box {
    height: 370px;
}

.gradient {
    background: linear-gradient(135deg, #00CBD8, #B844FF);
}
</style>