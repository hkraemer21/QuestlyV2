<script>
import { useAuthStore } from '../../stores/AuthStore.js';
import GameStore from '../../stores/GameStore.js';
import GameList from '../../components/GameList.vue';
import GameListMobile from '../../components/GameListMobile.vue';
import { computed, watch } from 'vue';


export default {
    name: "AppSideNav",

    setup() {
        const authStore = useAuthStore();
        const gameStore = GameStore();

        const gameList = computed(() => gameStore.games);
        const pinnedGameList = computed(() => gameStore.pinnedGames);

        watch(
            () => authStore.currentUser,
            (currentUser) => {
                gameStore.fetchGames(currentUser);
            },
            { immediate: true }
        );

        return { authStore, gameStore, gameList, pinnedGameList };
    },

    components: {
        GameList,
        GameListMobile,
    },

    methods: {
        selectGame(game) {
            this.selectedGame = game;
            this.gameStore.setCurrentGame(game);
        },
    },

}


</script>

<template>

    <div class="parchment-background mb-5 pb-4 overflow-auto" style="max-height: calc(100vh - 100px);">
        <div class="p-3">   

            <div class="desktop">
                <div class="text-center">
                    <router-link
                        to="/add-game"
                        class="btn header mt-2 fs-4 border border-2 border-black bg-black text-white rounded-0 w-75 p-2 ps-2 pe-2 d-inline-flex align-items-center justify-content-center gap-2"
                    >
                        <img class="add-game-btn d-block" src="../../images/shield-plus.png" alt="Add Game">
                        <span class="d-flex align-items-center lh-1 m-0 pt-1">Add</span>
                    </router-link>
                </div>
                <img src="../../images/game-title-divider.png" alt="header divider"
                    class="game-divider mb-2">
            </div>

            <!-- desktop version of game list -->
            <div class="ps-1 pe-1 desktop">
                <div v-if="pinnedGameList.length > 0">
                    <game-list name="Pinned Games" :list-of-items="pinnedGameList"
                    @select-game="selectGame"></game-list>

                    <p class="text-center"><i class="bi bi-suit-diamond-fill"></i></p>
                </div>


                <game-list name="All Games" :list-of-items="gameList"
                    @select-game="selectGame"></game-list>
            </div>

            <!-- mobile version of game list -->
            <div class="accordion mobile" id="mobileGameList">
                <div v-if="pinnedGameList.length > 0">
                    <game-list-mobile name="Pinned Games" :list-of-items="pinnedGameList"
                        :id="'pinnedGameList'" @select-game="selectGame"></game-list-mobile>
                </div>

                <game-list-mobile name="All Games" :id="'allGameList'" :list-of-items="gameList"
                    @select-game="selectGame"></game-list-mobile>

            </div>

        </div>
    </div>


</template>