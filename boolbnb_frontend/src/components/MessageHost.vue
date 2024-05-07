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
        <form @submit.prevent="sendForm()">
            <div
            class="bg-white box flex border-2 ml-20 mb-20 rounded-lg flex-col gap-4 items-center justify-between w-3/12 p-6 relative container">
                <button @click="closeMessageHost" class="absolute top-1 left-2">X</button>
                <p>Message Host</p>
                <hr class="w-full">
                <div class="flex flex-col text-sm">
                    <label for="name">Name*</label>
                    <input name="name" v-model="name" class="pl-2 border-2 md:pr-40 rounded-lg" type="text"
                        placeholder="Your Name" required>
                    <p v-for="(error, index) in errors?.name" :key='`name-errors-${index}`' class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <div class="flex flex-col text-sm">
                    <label for="email">Email*</label>
                    <input name="email" v-model="email" class="pl-2 md:pr-40 border-2 rounded-lg" type="email"
                        placeholder="Your Email" required>
                    <p v-for="(error, index) in errors?.email" :key='`email-errors-${index}`' class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <div class="flex flex-col text-sm">
                    <label for="message">Message*</label>
                    <textarea :class="{ 'is-invalid': errors.message }" name="message" id="message" rows="6"
                        placeholder="Your Message" v-model="message" class="border-2 rounded-lg w-50 md:w-96" required></textarea>
                    <p v-for="(error, index) in errors?.message" :key='`message-errors-${index}`'
                        class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <div v-if="loading" class="loading-spinner"><p class="text-white">a</p></div>
                <button v-if="!loading" @click="activateSuccessMessage" type="submit" class="py-2 px-20  rounded-lg gradient-button text-white">Send Message</button>
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
            name: '',
            email: '',
            message: '',
            errors: {},
            loading: false,
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
                name: this.name,
                email: this.email,
                content: this.message,
                accomodation_id: this.accomodation_id

            }
            console.log(data)

            this.errors = {};
            this.loading = true;

            axios.post(`http://127.0.0.1:8000/api/send-message`, data
            ).then(res => {

                console.log(res)
                this.success = res.data.success

                if (this.success === false) { 
                    this.errors = res.data.errors
                } else {
                    this.name = ''
                    this.email = ''
                    this.message = ''
                    this.utility_store.showMessageFeedback = true;
                    this.utility_store.showMessageHost = false;
                }
            })
            .finally(() => {
                    this.loading = false; // Disattiva lo stato di caricamento alla fine della richiesta
            });

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
    height: 510px;
}

.gradient-button {
    background: linear-gradient(135deg, #00CBD8, #B844FF);
}

.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.container{
    width: 350px;
    overflow: hidden;
    position: fixed;
    z-index: 12;
    left: 30%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    max-height: 90vh;
    overflow: scroll;
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
    overflow: scroll;
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
    overflow: scroll;
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
    overflow: scroll;
    border-radius: 20px;
}
}
</style>