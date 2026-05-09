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
            createFormError: ""
        }
    },
    methods: {
        async createAccount() {
            this.createFormError = "";

            if (!this.credentials.email || !this.credentials.password || !this.credentials.username) {
                this.createFormError = "Please fill in all fields.";
                return;
            }

            

            if (this.credentials.password.length < 6) {
                this.createFormError = "Password must be at least 6 characters.";
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

            <form @submit.prevent="createAccount">
                <div class="mb-3">
                    <label for="usernameInput" class="form-label">Username</label>
                    <input type="text" class="form-control" id="usernameInput" v-model="credentials.username">
                </div>
                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="emailInput" v-model="credentials.email">
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="credentials.password">
                    <div v-if="createFormError" class="text-danger small mt-1">{{ createFormError }}</div>
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