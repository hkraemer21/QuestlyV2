<script>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/AuthStore.js';
import { useGameStore } from '../stores/GameStore.js';
import { useAchievementStore } from '../stores/AchievementStore.js';
import AchievementList from './AchievementList.vue';
import DoubleCheckModal from './modals/DoubleCheckModal.vue';
import waypointIcon from '../images/waypoint.png';
import waypointFilledIcon from '../images/waypoint-filled.png';
import router from '@/router/index.js';

export default {
  name: "GameDisplay",
    setup() {
        const authStore = useAuthStore();
        const gameStore = useGameStore();
        const achievementStore = useAchievementStore();
        const route = useRoute();
        const editing = ref(false);
        const deleteConfirmModal = ref(null);
        const title = ref('');
        const platform = ref('');
        const imageURL = ref('');

        const gameId = computed(() => route.params.gameId);
        const game = computed(() => gameStore.selectedGame || null);

        const numberOfAchievements = computed(() => achievementStore.numberOfAchievementsComputed);
        const numberOfCompletedAchievements = computed(() => achievementStore.numberOfCompletedAchievementsComputed);

        const syncSelectedGameFromRoute = async () => {
            if (!gameId.value) return;

            if (!gameStore.selectedGame || gameStore.selectedGame.id !== gameId.value) {
                if (!gameStore.games.length && authStore.currentUser) {
                    await gameStore.fetchGames(authStore.currentUser);
                }
                gameStore.setCurrentGameById(gameId.value);
            }
        };

        const populateForm = () => {
            title.value = game.value?.title || '';
            platform.value = game.value?.platform || '';
            imageURL.value = game.value?.imageURL || '';
        };

        const updateGame = async () => {
            if (!authStore.currentUser || !game.value) return;

            game.value.title = title.value;
            game.value.platform = platform.value;
            game.value.imageURL = imageURL.value;

            await gameStore.updateGame(authStore.currentUser, game.value);
            editing.value = false;
        };

        const promptDeleteGame = () => {
            deleteConfirmModal.value?.open();
        };

        const deleteGame = async () => {
            if (!authStore.currentUser || !game.value) return;

            await gameStore.deleteGame(authStore.currentUser, game.value.id);
            router.push('/');
        };


        watch(() => authStore.currentUser, syncSelectedGameFromRoute, { immediate: true });
        watch(gameId, syncSelectedGameFromRoute, { immediate: true });
        watch(game, populateForm, { immediate: true });
        watch(game, async (newGame) => {
            if (newGame && authStore.currentUser) {
                await achievementStore.fetchAchievements(authStore.currentUser, newGame);
            }
        }, { immediate: true });

        return {   
            authStore, 
            gameStore, 
            achievementStore, 
            game, 
            numberOfAchievements,
            numberOfCompletedAchievements,
            editing, 
            deleteConfirmModal,
            title, 
            platform, 
            imageURL, 
            updateGame, 
            promptDeleteGame,
            deleteGame, 
            waypointIcon, 
            waypointFilledIcon 
        };
    },

    components: {
        AchievementList,
        DoubleCheckModal,
    },

    methods: {
        togglePinned() {
            if (!this.authStore.currentUser || !this.game) return;
            this.gameStore.togglePinGame(this.authStore.currentUser, this.game);
        },
    },

};

</script>

<template>

    <div class="parchment-background mb-5 body w-100">

        <div class="container p-3">

            <form @submit.prevent="updateGame">

                <div class="row d-flex justify-content-center position-relative">

                    <div class="col-12 col-md-4 d-flex justify-content-center">
                        <img v-if="game && game.imageURL" :src="game.imageURL" :alt="game.title + ' cover art'"
                            class="game-img mb-3 mb-md-0">
                        <img v-else src="../images/default-game-img.jpg" 
                            alt="Default game image" class="game-img mb-3 mb-md-0">
                    </div>

                    <div class="col-12 col-md-8 pt-4 position-relative overflow-hidden">
                        <div v-if="!editing">
                            <div class="row text-center">
                                <div class="col-1"></div>
                                <div class="col-10">
                                    <h2 class="header game-title m-0 fw-bold">{{(gameStore.selectedGame ? gameStore.selectedGame.title : 'No game found') }}</h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-1"></div>
                                <div class="col-10">
                                    <p  class="body fw-bold d-flex align-items-center gap-1 justify-content-center achievement-count">
                                        {{ game?.platform || '' }} | <img src="../images/treasure-icon.png" alt="Treasure chest icon" class="treasure-icon me-1">
                                        {{ numberOfCompletedAchievements > 0 ? `${numberOfCompletedAchievements}` : '0' }}/{{ numberOfAchievements  > 0 ? `${numberOfAchievements}` : '0' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="fw-bold">
                            <div class="row">
                                <div class="col-10">
                                    <div class="mb-3">
                                        <label for="gameTitleInput" class="form-label">Game Title</label>
                                        <input type="text" class="form-control" id="gameTitleInput" v-model="title">
                                    </div>
                                </div>
                                <div class="col-2 d-flex">
                                    <button @click.prevent="promptDeleteGame" class="edit-btn position-absolute top-0 end-0 m-3 pt-2">
                                        <img class="delete-img d-block p-0" src="../images/delete-img.png" alt="Delete Game">
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-10">
                                    <div class="mb-3">
                                        <label for="gamePlatformInput" class="form-label">Platform</label>
                                        <select id="gamePlatformInput" class="form-select" v-model="platform">
                                            <option value="" disabled>Choose one</option>
                                            <option value="Steam">Steam</option>
                                            <option value="Xbox">Xbox</option>
                                            <option value="PlayStation">PlayStation</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>  
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-10">
                                    <div class="mb-3">
                                        <label for="gameImageInput" class="form-label">Game Image URL</label>
                                        <input type="url" class="form-control" id="gameImageInput" v-model="imageURL">
                                    </div> 
                                </div>
                            </div> 
                            
                            <div class="row">
                                <div class="col-1"></div>
                                <div class="col-10">
                                    <div class="row mt-2">
                                        <div class="col-12 d-flex justify-content-center">
                                            <button type="submit" class="btn submit-btn fs-4">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <button type="button" @click.prevent="togglePinned" class="edit-btn position-absolute bottom-0 start-0 m-3 pt-2">
                                <img class="pin-img d-block p-0" :src="gameStore.selectedGame?.isPinned ? waypointFilledIcon : waypointIcon" alt="Pin Game">
                            </button>
                        </div>
                        <div class="position-absolute bottom-0 end-0 p-2">
                            <button type="button" @click.prevent="editing = !editing" class="edit-btn">
                                <img class="quill-img d-block p-0" src="../images/quill.png" alt="Edit Game">
                            </button>
                        </div>
                    </div>
                
                </div>

            </form>

        </div>

        
            
    </div>

    <achievement-list></achievement-list>

    <double-check-modal
        ref="deleteConfirmModal"
        title="Delete Game"
        message="Are you sure you want to delete this game? This action cannot be undone."
        confirm-label="Delete Game"
        cancel-label="Cancel"
        @confirm="deleteGame"
    />




</template>