<script>
import Achievement from '../../models/Achievement.js';
import { useAuthStore } from '../../stores/AuthStore.js';
import { useAchievementStore } from '../../stores/AchievementStore.js';
import { useGameStore } from '../../stores/GameStore.js';
import AppModal from './AppModal.vue';
import DoubleCheckModal from './DoubleCheckModal.vue';
import starImg from '../../images/star-img.png';
import starFilledImg from '../../images/star-img-filled.png';
import deleteImg from '../../images/delete-img.png';

export default {
    name: "EditAchievementModal",

    components: {
        AppModal,
        DoubleCheckModal,
    },

    emits: ['achievementUpdated'],

    setup() {
        const authStore = useAuthStore();
        const achievementStore = useAchievementStore();
        const gameStore = useGameStore();

        return { authStore, achievementStore, gameStore, starImg, starFilledImg, deleteImg };
    },

    props: {
        achievement: {
            type: Object,
            required: true
        },

    },

    data: function () {
        return {
            editedAchievement: {
                name: "",
                description: "",
                isIncremental: false,
                increment: 0,
            },
            
        };
    },

    watch: {
        achievement: {
            handler(newVal) {
                if (newVal) {
                    this.editedAchievement = {
                        name: newVal.name,
                        description: newVal.description,
                        isIncremental: newVal.isIncremental,
                        increment: newVal.increment || 0,
                        isFavorited: newVal.isFavorited ?? false,
                    };
                }
            },
            immediate: true,
        },
    },

    methods: {
        open() {
            if (this.$refs.modal) {
                this.$refs.modal.open();
            }
        },

        promptDeleteAchievement() {
            if (this.$refs.deleteConfirmModal) {
                this.$refs.deleteConfirmModal.open();
            }
        },

        async deleteAchievement() {
            if (!this.authStore.currentUser || !this.gameStore.selectedGame || !this.achievement) return;

            await this.achievementStore.deleteAchievement(
                this.authStore.currentUser,
                this.gameStore.selectedGame,
                this.achievement.id
            );

            if (this.$refs.modal) {
                this.$refs.modal.close();
            }
        },

        updateAchievement() {
            if (!this.authStore.currentUser || !this.gameStore.selectedGame) return;
            const achievement = new Achievement(
                this.editedAchievement.name,
                this.editedAchievement.description,
                this.editedAchievement.increment || 0,
                this.achievement.isPinned,
                this.editedAchievement.isIncremental,
                this.editedAchievement.isFavorited,
                this.achievement.isComplete,
                this.achievement.dateCompleted
            );
            achievement.id = this.achievement.id;
            this.achievementStore.updateAchievement(
                this.authStore.currentUser,
                this.gameStore.selectedGame,
                achievement
            );
            this.$emit('achievementUpdated');
            if (this.$refs.modal) {
                this.$refs.modal.close();
            }
        },

        toggleFavorite() {
            this.editedAchievement.isFavorited = !this.editedAchievement.isFavorited;
        },
    },

};


</script>


<template>

    <app-modal title="Edit Achievement" ref="modal" @submit="updateAchievement()">
        <template #header>
            <div class="w-100">
                <h2 class="modal-title header text-center fw-bold">Edit Achievement</h2>
                <img src="../../images/game-divider.png" alt="" class="divider-img mb-3 d-block mx-auto">
            </div>
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal"
                aria-label="Close"></button>
        </template>

        <div class="fw-bold body">
            <div class="mb-3">
                <label for="nameInput" class="form-label">Name</label>
                <input id="nameInput" type="text" class="form-control" v-model="editedAchievement.name" required>
            </div>
            <div class="mb-3">
                <label for="descriptionInput" class="form-label">Description</label>
                <textarea id="descriptionInput" type="text" class="form-control" v-model="editedAchievement.description" rows="3"></textarea>
            </div>
            <div class="mb-3">
                <label for="isIncrementalInput" class="form-label pe-3">Increment</label>
                <input id="isIncrementalInput" type="checkbox" class="form-check-input" v-model="editedAchievement.isIncremental">
            </div>
            <div class="mb-3 pb-3" v-if="editedAchievement.isIncremental">
                <label for="incrementInput" class="form-label">Number of times</label>
                <input id="incrementInput" type="number" class="form-control" v-model="editedAchievement.increment" required>
            </div>

            <div class="row align-items-center">
                <div class="col-3 d-flex justify-content-center m-0 p-0">
                    <button @click.prevent="toggleFavorite" class="edit-btn">
                        <img class="star-img d-block p-0" :src="editedAchievement.isFavorited ? starFilledImg : starImg" alt="Favorite Achievement">
                    </button>
                </div>
                <div class="col-6"></div>
                <div class="col-3 d-flex justify-content-center m-0 p-0">
                    <button @click.prevent="promptDeleteAchievement" class="edit-btn">
                        <img class="delete-img d-block p-0" :src="deleteImg" alt="Delete Achievement">
                    </button>
                </div>
            </div>
        </div>

        <template #footer>
            <div class="row mt-4 w-100">
                <div class="col-12 d-flex justify-content-center gap-2">
                    <button type="submit" class="btn submit-btn fs-5">Update Achievement</button>
                    <button type="button" class="btn text-decoration-underline fw-bold" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </template>
    </app-modal>

    <double-check-modal
        ref="deleteConfirmModal"
        title="Delete Achievement"
        message="Are you sure you want to delete this achievement? This action cannot be undone."
        confirm-label="Delete Achievement"
        cancel-label="Cancel"
        @confirm="deleteAchievement"
    />

</template>