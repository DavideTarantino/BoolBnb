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

    <main>
        <div v-if="success" role="alert">
            Messaggio inviato con successo
        </div>
        
        <form @submit.prevent="sendForm()">
            <div
            class="bg-white box flex border-2 ml-20 mb-20 rounded-lg flex-col gap-4 items-center justify-between p-6 relative">
                <button @click="closeMessageHost" class="absolute top-1 left-2">X</button>
                <p>Message Host</p>
                <hr class="w-full">
                <div>
                    <input name="email" v-model="email" class="pl-2 pr-40 border-2 rounded-lg" type="mail"
                        placeholder="Your Email">
                    <p v-for="(error, index) in errors?.email" :key='`email-errors-${index}`' class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <div>
                    <textarea :class="{ 'is-invalid': errors.message }" name="message" id="message" cols="38" rows="6"
                        placeholder="Your Message" v-model="message" class="border-2 rounded-lg"></textarea>
                    <p v-for="(error, index) in errors?.message" :key='`message-errors-${index}`'
                        class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <button @click="activateSuccessMessage" type="submit" class="py-2 px-20  rounded-lg gradient-button text-white">Send Message</button>
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
import { useUtilityStore } from '@/stores/utilityStore';

export default {
    name: 'MessageHost',
    components: {

    },
    props: ['accomodation_id'],
    data() {
        return {
            // name: '',
            email: '',
            message: '',
            errors: {},
            api_store: useApiStore(),
            utility_store: useUtilityStore(),
            success: false, //Variabile per mostrare il messaggio di successo
            isOpen: false, // Variabile per controllare la visibilità del componente
        }
    },
    mounted() {
        console.log(this.accomodation_id)
        console.log('ciao')
    },
    methods: {
        sendForm() {

            const data = {
                // name: this.name,
                email: this.email,
                content: this.message,
                accomodation_id: this.accomodation_id

            }
            console.log(data)

            this.errors = {};

            axios.post(`http://127.0.0.1:8000/api/send-message`, data
            ).then(res => {

                console.log(res)
                this.success = res.data.success

                if (!this.success) {
                    this.errors = res.data.errors
                } else {
                    this.email = ''
                    this.message = ''
                }
            })

        },
        closeMessageHost(){
            this.utility_store.showMessageHost = false;
        },
        // activateSuccessMessage(){
        //     this.utility_store.success = true;
        //     this.utility_store.showMessageHost = false;
        //     this.utility_store.showMessageFeedback = true;
        // }
    },
    mounted() {
    }
}


</script>

<style scoped>
.box {
    height: 370px;
}

.gradient-button {
    background: linear-gradient(135deg, #00CBD8, #B844FF);
}
</style>