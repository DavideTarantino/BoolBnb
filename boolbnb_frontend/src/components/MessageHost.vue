<template>
    <main>
        <div class="w-3/12 box flex border-2 ml-20 mb-20 rounded-lg flex-col gap-4 items-center justify-between p-6">
            <div>
                <p>Message Host</p>
            </div>
            <hr class="w-11/12">
            <input class="pl-2 pr-40 border-2 rounded-lg" type="mail" placeholder="Your Email">
            <textarea name="" id="" cols="38" rows="6" placeholder="Your Message" class="border-2 rounded-lg"></textarea>
            <button class="py-2 px-20  rounded-lg gradient-button text-white">Send Message</button>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'MessageHost',
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
.box{
    height: 370px;
}

.gradient-button{
        background: linear-gradient(135deg, #00CBD8, #B844FF);
    }

</style>