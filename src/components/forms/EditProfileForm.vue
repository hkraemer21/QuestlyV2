<script>
import { useAuthStore } from '../../stores/AuthStore.js';
import { watch } from 'vue';


export default {
    name: "EditProfile",

    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },

    data() {
        return {
            username: "",
            email: "",
            avatarURL: "",
            steamId: "",
            psnName: "",
            xboxGamertag: "",

            updateFormError: "",
            usernameError: "",
            emailError: "",
        }
    },

    mounted() {
        this.populateForm();
        
        watch(() => this.authStore.currentUser, () => {
            this.populateForm();
        });
    },

    methods: {
        populateForm() {
            if (this.authStore.currentUser) {
                this.username = this.authStore.currentUser.username || "";
                this.email = this.authStore.currentUser.email || "";
                this.avatarURL = this.authStore.currentUser.avatarURL || "";
                this.steamId = this.authStore.currentUser.steamId || "";
                this.psnName = this.authStore.currentUser.psnName || "";
                this.xboxGamertag = this.authStore.currentUser.xboxGamertag || "";
            }
        },


        async updateAccount() {
            const maxUsernameLength = 14;
            const minUsernameLength = 4;

            try {

                if (this.username.length > maxUsernameLength) {
                    this.usernameError = `Username cannot be longer than ${maxUsernameLength} characters.`;
                    return;
                }

                if (this.username.length < minUsernameLength) {
                    this.usernameError = `Username must be at least ${minUsernameLength} characters.`;
                    return;
                }

                await this.authStore.updateProfile({
                    username: this.username,
                    email: this.email,
                    avatarURL: this.avatarURL,
                    steamId: this.steamId,
                    psnName: this.psnName,
                    xboxGamertag: this.xboxGamertag,
                });
                console.log('Profile updated successfully');
            } catch (error) {
                console.error('Update failed:', error.message);
                alert('Failed to update profile: ' + error.message);
            }
        },
    }

}


</script>

<template>

    <div class="parchment-background mb-5 body">

        <div class="container p-3">

            <h2 class="header fw-bold text-center">Profile</h2>
            <img src="../../images/game-divider.png" alt="" class="divider-img mb-4 d-block mx-auto">

            <form @submit.prevent="updateAccount">


                <div class="row align-items-center">

                    <div class="col-12 col-md-4 d-flex justify-content-center">
                        <img v-if="authStore.currentUser && authStore.currentUser.avatarURL" :src="authStore.currentUser.avatarURL" :alt="'Avatar of ' + authStore.currentUser.name"
                            class="profile-avatar mb-3 mb-md-0">
                        <img v-else src="../../images/default-avatar.png" 
                            alt="Default Avatar of a knight" class="profile-avatar mb-3 mb-md-0">
                    </div>

                    <div class="col-12 col-md-8 fw-bold mt-2 mt-md-0">
                        <div v-if="updateFormError" class="text-danger small mt-1">{{ updateFormError }}</div>
                        <div class="mb-3">
                            <label for="usernameInput" class="form-label">Username</label>
                            <input type="text" class="form-control" id="usernameInput" v-model="username">
                            <div v-if="usernameError" class="text-danger small mt-1">{{ usernameError }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="emailInput" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="emailInput" v-model="email" :disabled="authStore.isGoogleUser">
                            <small v-if="authStore.isGoogleUser" class="text-muted">You cannot edit email because you signed in with Google</small>
                        </div>    
                        <div class="mb-3">
                            <label for="avatarUrlInput" class="form-label">Avatar URL</label>
                            <input type="url" class="form-control" id="avatarUrlInput" v-model="avatarURL">
                        </div>               

                    </div>
                </div>

                <div class="fw-bold mt-4">
                    <div class="mb-3">
                            <label for="steamIdInput" class="form-label">Steam ID</label>
                            <input type="text" class="form-control" id="steamIdInput" v-model="steamId">
                        </div>
                        <div class="mb-3">
                            <label for="psnNameInput" class="form-label">PSN Name</label>
                            <input type="text" class="form-control" id="psnNameInput" v-model="psnName">
                        </div>    
                        <div class="mb-3">
                            <label for="xboxGamertagInput" class="form-label">XBox Gamertag</label>
                            <input type="text" class="form-control" id="xboxGamertagInput" v-model="xboxGamertag">
                        </div>   
                </div>

                <div class="row mt-5">
                    <div class="col-12 mb-5 d-flex justify-content-center">
                        <button type="submit" class="btn submit-btn fs-4">Update</button>
                    </div>
                </div>

            </form>

        </div>
                    
    </div>


</template>