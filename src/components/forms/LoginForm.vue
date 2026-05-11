<script>
import { useAuthStore } from "../../stores/AuthStore.js";
import FormTemplate from "./AuthFormTemplate.vue";

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
            email: "",
            password: "",
        };
    },
    methods: {
        async login() {
            try {
                await this.authStore.login(this.email, this.password);
            } catch (error) {
                console.error(error.message);
                alert("Login failed: " + error.message);
            }
        },
    },
};
</script>

<template>

    <form-template>

        <template #form>

            <h1 class="text-center text-black header p-3">Login</h1>

            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="emailInput" v-model="email">
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="password">
                </div>

                <div class="row mt-5">
                    <div class="col-12 col-md-6 d-flex justify-content-center mb-2 mb-md-0">
                        <button type="submit" class="btn submit-btn fs-4 w-100">Login</button>
                    </div>
                    <div class="col-12 col-md-6 d-flex justify-content-center">
                        <button type="button" @click.prevent="authStore.loginWithGoogle()" class="btn submit-btn fs-4 w-100">Login with Google</button>
                    </div>
                </div>

                <div class="text-center mt-4 mb-2">
                    <router-link to="/create-account" class="btn btn-link text-black">Create an account</router-link>
                </div>
            </form>

        </template>

    </form-template>    
    
</template>
