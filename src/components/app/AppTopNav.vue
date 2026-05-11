<script>
import { RouterView } from 'vue-router';
import { useAuthStore } from '../../stores/AuthStore.js';

export default {
    name: "AppTopNav",

    components: {
        RouterView,
    },

    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },

    async mounted() {
        await this.authStore.initializeAuth();        
    },

    methods: {
        async logout() {
            try {
                await this.authStore.logout();
            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    }

}


</script>

<template>

    <ul class="nav nav-underline navigation bg-black bg-opacity-75 d-flex align-items-center m-0 p-0 pt-2 pb-2 w-100">
        <div class="row w-100 g-0 d-flex justify-content-center align-items-center">
            <div class="col-3 d-flex justify-content-start align-items-center">
                <div class="mobile">
                    <RouterLink 
                        class="btn header p-0 ms-4" to="/add-game">
                                    <img class="add-game-btn" src="../../images/shield-plus.png" alt="Add Game"></RouterLink>
                </div>
            </div>
            <div class="col-6 d-flex justify-content-center">
                <li class="align-items-center d-flex justify-content-center">
                    <RouterLink class="brand-name m-1" to="/"><img class="logo" src="../../images/scroll-icon-6.png"
                            alt="">Questly</RouterLink>
                </li>                
            </div>
            <div class="col-3 d-flex justify-content-end align-items-center">
                <li v-if="authStore.isAuthenticated" class="d-flex align-items-center">
                    <div class="btn-group d-flex align-items-center">
                        <button class="btn btn-black btn-lg nav-item d-flex align-items-center" type="button">
                            <RouterLink :to="{ name: 'profile', params: { username: authStore.currentUser ? authStore.currentUser.username : '' } }">
                                <div class="row text-white body mx-0 d-flex align-items-center h-100">
                                    <div class="col p-0 d-flex align-items-center h-100">
                                        <img v-if="authStore.currentUser && authStore.currentUser.avatarURL" :src="authStore.currentUser.avatarURL" :alt="'Avatar of ' + authStore.currentUser.name"
                                            class="avatar-img me-2">
                                        <img v-else src="../../images/default-avatar.png" 
                                            alt="Default Avatar of a knight" class="avatar-img">                                                
                                    </div>
                                    <div class="col p-0 d-flex align-items-center text-white h-100">
                                        <span class="username ms-2">{{ authStore.currentUser ? authStore.currentUser.username : "User" }}</span>
                                    </div>
                                </div>
                            </RouterLink>
                        </button>
                        <button type="button" class="btn btn-lg nav-item me-3 text-white btn-black dropdown-toggle dropdown-toggle-split d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu bg-black bg-opacity-75">
                            <li>
                                <RouterLink class="btn btn-link brand-name m-1 text-decoration-none fs-5" 
                                    :to="{ name: 'profile', params: { username: authStore.currentUser ? authStore.currentUser.username : '' } }">Profile</RouterLink>
                            </li>
                            <hr class="dropdown-divider bg-white">
                            <li class="nav-item ms-auto align-items-end">
                                <button @click="logout" class="btn btn-link brand-name m-1 text-decoration-none fs-5">Logout</button>
                            </li>
                        </ul>
                    </div>
                </li>
            </div>
        </div>
    </ul>


</template>