<script>
import Achievement from '../../models/Achievement.js';
import { useAuthStore } from '../../stores/AuthStore.js';
import { useAchievementStore } from '../../stores/AchievementStore.js';
import { useGameStore } from '../../stores/GameStore.js';
import AppModal from './AppModal.vue';
import starImg from '../../images/star-img.png';
import starFilledImg from '../../images/star-img-filled.png';

export default {
    name: "AddAchievementModal",

    components: {
        AppModal,
    },

    setup() {
        const authStore = useAuthStore();
        const achievementStore = useAchievementStore();
        const gameStore = useGameStore();

        return { authStore, achievementStore, gameStore, starImg, starFilledImg };
    },

    props: {
        

    },

    data: function () {
        return {
            newAchievement: {
                name: "",
                description: "",
                isIncremental: false,
                increment: 0,
                isFavorited: false,
            },
            
        };
    },

    methods: {
        open() {
            if (this.$refs.modal) {
                this.$refs.modal.open();
            }
        },

        async addNewAchievement() {
            if (!this.authStore.currentUser) {
                console.error("User not authenticated");
                return;
            }

            if (!this.gameStore.selectedGame) {
                console.error("No game selected");
                return;
            }

            try {
                const achievement = new Achievement(
                    this.newAchievement.name,
                    this.newAchievement.description,
                    this.newAchievement.increment,
                    false,
                    this.newAchievement.isIncremental,
                    this.newAchievement.isFavorited,
                    false,
                    ''
                );

                await this.achievementStore.addAchievement(
                    this.authStore.currentUser,
                    this.gameStore.selectedGame,
                    achievement
                );
                this.resetForm();
                if (this.$refs.modal) {
                    this.$refs.modal.close();
                }
            } catch (error) {
                console.error("Error adding achievement: ", error);
            }
        },

        resetForm() {
            this.newAchievement.name = "";
            this.newAchievement.description = "";
            this.newAchievement.isIncremental = false;
            this.newAchievement.increment = 0;
            this.newAchievement.isFavorited = false;
        }
    },

};


</script>


<template>

    <app-modal title="Add Achievement" ref="modal" @submit="addNewAchievement()">
        <template #header>
            <div class="w-100">
                <h2 class="modal-title header text-center fw-bold">Add Achievement</h2>
                <img src="../../images/game-divider.png" alt="" class="divider-img mb-3 d-block mx-auto">
            </div>
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal"
                aria-label="Close"></button>
        </template>

        <div class="fw-bold body">
            <div class="mb-3">
                <label for="nameInput" class="form-label">Name</label>
                <input id="nameInput" type="text" class="form-control" v-model="newAchievement.name" required>
            </div>
            <div class="mb-3">
                <label for="descriptionInput" class="form-label">Description</label>
                <textarea id="descriptionInput" type="text" class="form-control" v-model="newAchievement.description" rows="3"></textarea>
            </div>
            <div class="mb-3">
                <label for="isIncrementalInput" class="form-label pe-3">Increment</label>
                <input id="isIncrementalInput" type="checkbox" class="form-check-input" v-model="newAchievement.isIncremental">
            </div>
            <div class="mb-3" v-if="newAchievement.isIncremental">
                <label for="incrementInput" class="form-label">Number of times</label>
                <input id="incrementInput" type="number" class="form-control" v-model="newAchievement.increment" required>
            </div>
            <div class="row align-items-center">
                <div class="col-3 d-flex justify-content-center m-0 p-0">
                    <button @click.prevent="newAchievement.isFavorited = !newAchievement.isFavorited" class="edit-btn m-3">
                        <img class="star-img d-block p-0" :src="newAchievement.isFavorited ? starFilledImg : starImg" alt="Favorite Achievement">
                    </button>
                </div>
                <div class="col-9"></div>
            </div>
        </div>

        <template #footer>
            <div class="row mt-4 w-100">
                <div class="col-12 d-flex justify-content-center gap-2">
                    <button type="submit" class="btn submit-btn fs-5">Add Achievement</button>
                    <button type="button" class="btn text-decoration-underline fw-bold" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </template>

    </app-modal>


</template>