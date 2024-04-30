<template>
    <!-- <main>
        <div class="w-3/12 box flex border-2 ml-20 mb-20 rounded-lg flex-col gap-4 items-center justify-between p-6 relative">
            <p class="absolute top-1 left-2">X</p>
            <p>Message Host</p>
            <hr class="w-full">
            <input class="pl-2 pr-40 border-2 rounded-lg" type="mail" placeholder="Your Email">
            <textarea name="" id="" cols="38" rows="6" placeholder="Your Message" class="border-2 rounded-lg"></textarea>
            <button class="py-2 px-20  rounded-lg gradient-button text-white">Send Message</button>
        </div>
    </main> -->

    <main class="bg-yellow-100">

        <div class="bg-red-100" role="alert" v-if="success" >
            Messaggio inviato con successo
        </div>

        <form @submit.prevent="sendForm()">
            <div class="w-3/12 box flex border-2 ml-20 mb-20 rounded-lg flex-col gap-4 items-center justify-between p-6 relative">
                <p class="absolute top-1 left-2">X</p>
                <p>Message Host</p>
                <hr class="w-full">
                <div>
                    <input :class="{'is-invalid': errors.email}" name="email" v-model="email" class="pl-2 pr-40 border-2 rounded-lg" type="mail" placeholder="Your Email">
                    <p v-for="(error, index) in errors?.email" :key='`email-errors-${index}`'
                        class="invalid-feedback"
                    >
                        {{ error }}
                    </p>
                </div>
                <div>
                    <textarea :class="{'is-invalid': errors.message}" name="message" id="message" cols="38" rows="6" placeholder="Your Message" v-model="message" class="border-2 rounded-lg"></textarea>
                    <p v-for="(error, index) in errors?.message" :key='`message-errors-${index}`'
                        class="invalid-feedback"
                    >
                        {{ error }}
                    </p>
                </div>
                <button type="submit" class="py-2 px-20  rounded-lg gradient-button text-white">Send Message</button>
            </div>
        </form>
    </main>

</template>

<script>
    // export default {
    //     name: 'MessageHost',
    //     data(){
    //         return{

    //         }
    //     }
    // }

    import axios from 'axios'
    import { useApiStore } from '@/stores/apiStore'

    export default{
        name: 'MessageHost',
        components:{

        },
        data(){
            return{
                // name: '',
                email: '',
                message: '',
                errors: { },
                success: false,
                api_store: useApiStore(),
            }
        },
        methods:{
            sendForm(){

                const data = {
                    // name: this.name,
                    email: this.email,
                    message: this.message,
                }

                this.errors = {};

                axios.post(`${this.api_store.backend_endpoint}/contacts`,data
                // {
                //     params: {
                //         data
                //     }}
                ).then(res => {
                    
                    this.success = res.data.success

                    if(!this.success){ 
                        this.errors = res.data.errors
                    }else{
                        // this.name = ''
                        this.email = ''
                        this.message = ''
                    }
                })

            }
        },
        mounted(){
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