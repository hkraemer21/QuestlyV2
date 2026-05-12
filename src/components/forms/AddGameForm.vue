<script>
import { useAuthStore } from '../../stores/AuthStore.js';
import { useGameStore } from '../../stores/GameStore.js';

import GameFactory from '../../models/GameFactory.js';
import Game from '../../models/Game.js';
import router from '../../router/index.js';


export default {
    name: "AddGameForm",

    setup() {
        const authStore = useAuthStore();
        const gameStore = useGameStore();
        return { authStore, gameStore, Game };
    },

    data() {
        return {
            game: {
                title: "",
                platform: "",
                imageURL: "",
            },
            choice: "",
            steamGames: [],
            steamGame: {
                appid: null,
                name: "",
                platform: "Steam",
                img_icon_url: "",
            },
            steamGameAchievements: [],
        }
    },

    methods: {

        async addGame () {
            if (!this.authStore.currentUser) {
                console.error("User not authenticated");
                return;
            }

            try {
                const newGame = GameFactory.createGameFromUserInput(this.game);
                console.log("Adding game:", newGame);

                await this.gameStore.addGame(this.authStore.currentUser, newGame);
                console.log("Game added successfully");
                
                this.resetForm();
                console.log("About to navigate to home");
                
                await router.push('/');
                console.log("Navigation complete");
            } catch (error) {
                console.error("Error adding game: ", error);
            }
        },

        resetForm() {
            this.game.title = "";
            this.game.platform = "";
            this.game.imageURL = "";
        },
    },

}

</script>

<template>
    
    <div class="parchment-background mb-5 pb-4 body w-100">

        <div class="container p-3 mt-3">
            <h2 class="fw-bold text-center">How do you want to add a game?</h2>
            <div class="row mt-5">
                <div class="col-12 col-md-6 mb-4 d-flex justify-content-center">
                    <button class="btn submit-btn fs-4 w-75" @click="choice = 'manual'">Manually</button>
                </div>
                <div class="col-12 col-md-6 mb-4 d-flex justify-content-center">
                    <button class="btn submit-btn fs-4 w-75" @click="choice = 'steam'">From Steam</button>
                </div>
            </div>
        </div>

        <div v-if="choice == 'manual'" class="container p-3 fw-bold">

            <h2 class="header text-center">Add Game</h2>
            <img src="../../images/game-divider.png" alt="" class="divider-img mb-4 d-block mx-auto">

            <form @submit.prevent="addGame">

                <div class="mb-3">
                    <label for="gameTitleInput" class="form-label">Game Title</label>
                    <input type="text" class="form-control" id="gameTitleInput" v-model="game.title" required>
                </div>
                <div class="mb-3">
                    <label for="gamePlatformInput" class="form-label">Platform</label>
                    <select id="gamePlatformInput" class="form-select" v-model="game.platform" required>
                        <option value="" disabled>Choose one</option>
                        <option value="Steam">Steam</option>
                        <option value="Xbox">Xbox</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>    
                <div class="mb-3">
                    <label for="gameImageInput" class="form-label">Game Image URL</label>
                    <input type="url" class="form-control" id="gameImageInput" v-model="game.imageURL">
                </div>  
                

                <div class="row mt-5">
                    <div class="col-12 mb-5 d-flex justify-content-center">
                        <button type="submit" class="btn submit-btn fs-4">Add Game</button>
                    </div>
                </div>

            </form>

        </div>

        <div v-else-if="choice == 'steam' && authStore.currentUser?.steamId" class="container p-3 fw-bold">

            <h2 class="header text-center">This does not work :(</h2>
            <h2 class="header text-center pb-3">Not for lack of trying!</h2>

        </div>

        <div v-else-if="choice == 'steam' && !authStore.currentUser?.steamId" >
            <p class="text-center mt-4">To add games from your Steam account, please connect your Steam account in your profile settings.</p>
        </div>
                    
    </div>
    
</template>