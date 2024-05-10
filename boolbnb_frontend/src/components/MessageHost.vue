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
                class="bg-white box flex ml-20 mb-20 rounded-lg flex-col gap-4 items-center justify-between w-3/12 px-6 py-10 relative container">
                <img @click="closeMessageHost" src="../../other-icons/close-icon.svg"
                    class="top-3 left-3 text-4xl cursor-pointer w-10 absolute" alt="">
                <p class="font-medium">Message Host</p>

                <hr class="w-full mb-5">

                <div class="flex flex-col text-sm w-full">
                    <label class="mb-2" for="name">Name*</label>
                    <input name="name" v-model="name" class="border-1 md:pr-40 rounded-lg" type="text"
                        placeholder="Your Name" required>
                    <p v-for="(error, index) in errors?.name" :key='`name-errors-${index}`' class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <div class="flex flex-col text-sm w-full">
                    <label class="mb-2" for="email">Email*</label>
                    <input name="email" v-model="email" class="pl-2 md:pr-40 border-1 rounded-lg" type="email"
                        placeholder="Your Email" required>
                    <p v-for="(error, index) in errors?.email" :key='`email-errors-${index}`' class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <div class="flex flex-col text-sm w-full">
                    <label class="mb-2" for="message">Message*</label>
                    <textarea :class="{ 'is-invalid': errors.message }" name="message" id="message" rows="6"
                        placeholder="Your Message" v-model="message" class="border-1 rounded-lg w-50 md:pr-40 "
                        required></textarea>
                    <p v-for="(error, index) in errors?.message" :key='`message-errors-${index}`'
                        class="invalid-feedback">
                        {{ error }}
                    </p>
                </div>
                <div v-if="loading" class="loading-spinner">
                    <p class="text-white">a</p>
                </div>
                <button v-if="!loading" @click="activateSuccessMessage" type="submit"
                    class="py-2 px-20  rounded-lg gradient-button text-white w-full mt-5">Send Message</button>
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
    props: ['accomodation_id', 'prop_dates'],
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

    },
    methods: {
        sendForm() {

            const data = {
                name: this.name,
                email: this.email,
                content: this.message,
                accomodation_id: this.accomodation_id,
                start_date: this.prop_dates.start,
                end_date: this.prop_dates.end,
            }

            this.errors = {};
            this.loading = true;

            axios.post(`http://127.0.0.1:8000/api/send-message`, data
            ).then(res => {

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
        closeMessageHost() {
            this.utility_store.showMessageHost = false;
        },
        formatDate(date) {
            if (!date || isNaN(date)) {
                return '';
            }
            // Convert milliseconds to a Date object
            const dateObj = new Date(date);
            // Check if the conversion was successful
            if (isNaN(dateObj.getTime())) {
                return '';
            }
            // Extract year, month, and day from the Date object
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // Months are zero-based
            const year = dateObj.getFullYear();
            // Format the date string
            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
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
    height: 600px;
}


input:focus,
textarea:focus {
    outline: none;
    color: black;
    border: 1px solid #121212;
    box-shadow: 0 1px 6px 0 rgb(255, 255, 255);
    border-radius: 0.5rem;
}

input,
textarea {
    border-color: #B0B0B0;
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
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.container {
    width: 350px;
    overflow: hidden;
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
    .container {
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
    .container {
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
    .container {
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