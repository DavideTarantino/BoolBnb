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

    <div>
        <h1>Contact Form</h1>
                                    <!-- viene mostrato l'alert di 'success' se il messaggio verrà inviato con successo-->
        <div class="alert alert-success" role="alert" v-if="success" >
            Messaggio inviato con successo
        </div>

        <div>
            <form @submit.prevent="sendForm()">

                <!-- NOME -->
                <!-- <div class="mb-3">
                    <input type="text" class="form-control"
                        :class="{'is-invalid': errors.name}"
                        name="name"
                        placeholder="..."
                        v-model="name"
                        >
                    <p v-for="(error, index) in error?.name" :key='`message-errors-${index}`'
                        class="invalid-feedback"
                        >
                        {{ error }}
                    </p>
                </div> -->


                <!-- MESSAGGIO -->
                <div class="">
                    <input type="text" class="form-control"
                        :class="{'is-invalid': errors.email}"
                        name="email"
                        placeholder="..."
                        v-model="email"
                        >
                    <p v-for="(error, index) in error?.email" :key='`message-errors-${index}`'
                        class="invalid-feedback"
                        >
                        {{ error }}
                    </p>
                </div>


                <!-- TESTO -->
                <div class="mb-3">
                    <textarea class="form-control"
                        :class="{'is-invalid': errors.message}" 
                        name="message"
                        id="message"
                        cols="30"
                        rows="10"
                        v-model="message"
                    >
                    </textarea>

                    <p v-for="(error, index) in error?.message" :key='`message-errors-${index}`'
                        class="invalid-feedback"
                        >
                        {{ error }}
                    </p>
                </div>

                <!-- BTN -->
                <button class="btn btn-primary" type="submit">Invia</button>


                <main>
                    <div class="w-3/12 box flex border-2 ml-20 mb-20 rounded-lg flex-col gap-4 items-center justify-between p-6 relative">
                        <p class="absolute top-1 left-2">X</p>
                        <p>Message Host</p>
                        <hr class="w-full">
                        <input class="pl-2 pr-40 border-2 rounded-lg" type="mail" placeholder="Your Email">
                        <textarea name="" id="" cols="38" rows="6" placeholder="Your Message" class="border-2 rounded-lg"></textarea>
                        <button class="py-2 px-20  rounded-lg gradient-button text-white">Send Message</button>
                    </div>
                </main>


            </form>
        </div>
    </div>

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
    import {store} from '../stores/apiStore'

    export default{
        name: 'ContactForm',
        components:{

        },
        data(){
            return{
                store,
                name: '',
                email: '',
                massage: '',
                errors: { },
                success: false,
            }
        },
        methods:{
            sendForm(){

                const data = {
                    name: this.name,
                    email: this.email,
                    massage: this.massage,
                }

                this.errors = {};

                axios.post(`${this.apiStore.backend_endpoint}/contacts`, data).then(res => {
                    
                    this.success = res.data.success

                    if(!this.success){ 
                        this.errors = res.data.errors
                    }else{
                        this.name = ''
                        this.email = ''
                        this.massage = ''
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