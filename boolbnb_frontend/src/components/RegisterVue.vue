<template>
    <div class="login-container">
        <i class="fa-solid fa-xmark ms-auto cursor-pointer" @click="closeRegister()"></i>
        <form @submit.prevent="register()" class="py-6 rounded-lg">
            <h2 class="text-xl font-semibold text-center mb-4">
                Sign Up
            </h2>
            <input type="text" v-model="register_data.name" placeholder="Your Name*" class="w-full" autocomplete
                required>
            <input type="text" v-model="register_data.surname" placeholder="Your Surname*" class="w-full" autocomplete
                required>
            <input type="email" v-model="register_data.email" placeholder="Your Email*" class="w-full" autocomplete
                required>
            <div class="error" v-show="errors.email.length > 0" v-for="(error, index) in errors.email" :key="index">
                {{ error }}
            </div>
            <input type="password" v-model="register_data.password" placeholder="Your Password*" class="w-full"
                required>
            <input type="password" v-model="register_data.password_confirmation" placeholder="Confirm Password*"
                class="w-full" required>
            <div class="error" v-show="errors.password.length > 0" v-for="(error, index) in errors.password"
                :key="index">
                {{ error }}
            </div>
            <label for="birth_date" class="me-auto ps-1 text-gray-600"> Your Birthdate*</label>
            <input type="date" :min="date_min" :max="date_max" class="w-full" id="birth_date"
                v-model="register_data.birth_date">
            <label for="phone_number" class="me-auto ps-1 text-gray-600"> Your Phone Number</label>
            <input type="text" id="phone_number" class="w-full" pattern="[\d\s+]*" autocomplete>
            <label for="prop_pic" class="me-auto ps-1 text-gray-600"> Upload your profile picture</label>
            <input type="file" id="prop_pic" class="w-full" @change="handleFileUpload" accept=".jpg,.png, .jpeg">

            <button type="submit" class="py-2 rounded-lg gradient-button text-white w-1/2 mt-5">
                Continue
            </button>
            <p class="me-auto ps-1 text-gray-600 mt-4" @click="goToLogin()">
                Already have an account?
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
            register_data: {
                name: '',
                surname: '',
                email: '',
                password: '',
                password_confirmation: '',
                birth_date: '',
                user_propic: null

            },
            errors: {
                email: [],
                password: []
            }

        }
    },
    methods: {
        async register() {
            this.errors.password = []
            this.errors.email = []
            if (this.register_data.password.length < 7) {
                this.errors.password.push('Your password needs to be at least 7 digits long')
                console.log(this.errors.password)
                return
            }
            if (this.register_data.password !== this.register_data.password_confirmation) {
                this.errors.password.push('The password confirmation does not match the chosen password')
                return
            }

            await this.api_strore.sendRegisterRequest(this.register_data)
        },
        closeRegister() {
            this.utility_store.show_register = false
        },
        goToLogin() {
            this.utility_store.show_register = false
            this.utility_store.show_login = true
        },
        handleFileUpload(event) {
            this.register_data.user_propic = event.target.files[0];
        }
    },
    computed: {
        date_max() {
            let today = new Date();
            today.setFullYear(today.getFullYear() - 18);
            return today.toISOString().split('T')[0];
        },
        date_min() {
            let today = new Date();
            today.setFullYear(today.getFullYear() - 100);
            return today.toISOString().split('T')[0];
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

.error {
    color: lightcoral;
    font-size: 0.8em;
    margin-right: auto;
}
</style>