<script>
import { RouterView } from 'vue-router';
import AppHeader from './components/app/AppHeader.vue';
import { useAuthStore } from './stores/AuthStore.js';

export default {
    components: {
        RouterView,
        AppHeader
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

    <div class="wooden-background min-vh-100 position-relative">

        <div class="">
            <ul class="nav nav-underline navigation bg-black bg-opacity-75">
                <div class="row w-100">
                    <div class="col-3"></div>
                    <div class="col-6 d-flex justify-content-center">
                        <li class="nav-item align-items-center d-flex justify-content-center">
                            <RouterLink class="brand-name m-1" to="/"><img class="logo" src="./images/scroll-icon-6.png"
                                    alt="">Questly</RouterLink>
                        </li>                
                    </div>
                    <div class="col-3 d-flex justify-content-end">
                        <li v-if="authStore.isAuthenticated">
                            <div class="btn-group">
                                <button class="btn btn-black btn-lg text-white body mx-0 d-flex align-items-center" type="button">
                                    <img v-if="authStore.currentUser && authStore.currentUser.avatarUrl" :src="authStore.currentUser.avatarUrl" :alt="'Avatar of ' + authStore.currentUser.name"
                                        class="avatar-img me-2">
                                    <img v-else src="https://static.vecteezy.com/system/resources/thumbnails/014/471/961/small/knight-avatar-icon-simple-style-vector.jpg" 
                                        alt="Default Avatar of a knight" class="avatar-img">
                                    <span class="align-middle username ms-2">{{ authStore.currentUser ? authStore.currentUser.username : "User" }}</span>
                                </button>
                                <button type="button" class="btn btn-lg text-white btn-black dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu bg-black bg-opacity-75">
                                    <li>
                                        <RouterLink class="btn btn-link brand-name m-1 text-decoration-none fs-5" to="/profile">Profile</RouterLink>
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

            <div class="container-fluid body-area px-0">

                <RouterView v-if="$route && $route.name !== 'login'"></RouterView>
                <RouterView v-else/>

            </div>

            
        </div>

        <footer class="position-absolute bottom-0 w-100">
            <p>&copy; 2026 Questly. All rights reserved.</p>
        </footer>

    </div>

    

</template>