<script>
import { useAuthStore } from "../../stores/AuthStore.js";
import FormTemplate from "./FormTemplate.vue";

export default {

    components: {
        FormTemplate,
    },

    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },

    data() {
        return {
            credentials: {
                username: "",
                email: "",
                password: "",
            },
            confirmPassword: "",
            createFormError: "",
            usernameError: "",
            passwordError: "",
        }
    },
    methods: {
        async createAccount() {
            const maxUsernameLength = 14;
            const minUsernameLength = 4;
            const minPasswordLength = 6;

            if (!this.credentials.email || !this.credentials.password || !this.credentials.username) {
                this.createFormError = "Please fill in all fields.";
                return;
            }

            if (this.credentials.username.length > maxUsernameLength) {
                this.usernameError = `Username cannot be longer than ${maxUsernameLength} characters.`;
                return;
            }

            if (this.credentials.username.length < minUsernameLength) {
                this.usernameError = `Username must be at least ${minUsernameLength} characters.`;
                return;
            }

            if (this.credentials.password.length < minPasswordLength) {
                this.passwordError = `Password must be at least ${minPasswordLength} characters.`;
                return;
            }

            if (this.credentials.password !== this.confirmPassword) {
                this.passwordError = "Passwords do not match.";
                return;
            }



            try {
                await this.authStore.createAccount(
                    this.credentials.email,
                    this.credentials.password,
                    this.credentials.username
                );
            } catch (error) {
                console.error(error.message);
                this.createFormError = "Account creation failed: " + error.message;
            }
        }
    }
}
</script>

<template>

    <form-template>
        <template #form>
            <h1 class="text-center text-black header p-3">Create Account</h1>
            <div v-if="createFormError" class="text-danger small mt-1">{{ createFormError }}</div>

            <form @submit.prevent="createAccount">
                <div class="mb-3">
                    <label for="usernameInput" class="form-label">Username</label>
                    <input type="text" class="form-control" id="usernameInput" v-model="credentials.username">
                    <div v-if="usernameError" class="text-danger small mt-1">{{ usernameError }}</div>
                </div>
                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="emailInput" v-model="credentials.email">
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="credentials.password">
                </div>
                <div class="mb-3">
                    <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPasswordInput" v-model="confirmPassword">
                    <div v-if="passwordError" class="text-danger small mt-1">{{ passwordError }}</div>
                </div>
                
                <div class="row mt-5">
                    <div class="col-12 d-flex justify-content-center">
                        <button type="submit" class="btn submit-btn fs-4">Create Account</button>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12 text-center">
                        <router-link to="/login" class="btn btn-link text-black">Already have an account? Login</router-link>
                    </div>
                </div>

            </form>
        </template>
    </form-template>
</template>