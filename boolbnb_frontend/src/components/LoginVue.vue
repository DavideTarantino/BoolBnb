<template>
    <div class="login-container">
        <form @submit.prevent="logIn()" class="py-12 rounded-lg">
            <h2 class="text-xl font-semibold text-center mb-8">
                Login or Sign Up
            </h2>
            <input type="email" v-model="login_data.email" placeholder="Your Email*" class="w-full" autocomplete="">
            <input type="password" v-model="login_data.password" placeholder="Your Password*" class="w-full"
                autocomplete="">
            <button type="submit" class="py-2 rounded-lg gradient-button text-white w-1/2 mt-5"> Continue
            </button>
            <p class="me-auto ps-1 text-gray-600 mt-4 cursor-pointer" @click="goToRegister()">
                Don't have an account?
            </p>
        </form>

    </div>
</template>

<script>
import { useApiStore } from '../stores/apiStore'
import { useUtilityStore } from '../stores/utilityStore'

export default {
    data() {
        return {
            api_strore: useApiStore(),
            utility_store: useUtilityStore(),
            login_data: {
                email: '',
                password: ''
            }

        }
    },
    methods: {
        async logIn() {
            if (this.login_data.email.length < 0 || this.login_data.password.length < 0 || !this.login_data.email.includes('@')) {
                return
            }
            await this.api_strore.sendLoginRequest(this.login_data.email, this.login_data.password)
        },
        goToRegister() {
            this.utility_store.show_register = true
            this.utility_store.show_login = false
        }
    }
}
</script>

<style scoped>
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(100, 100, 100, 0.6);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: white;
    width: 30%;
    padding-inline: 50px;
    align-items: center;

}

form input {
    border-radius: 10px;
}



.gradient-button {
    background: linear-gradient(135deg, #00CBD8, #B844FF);
    text-align: center;
}
</style>