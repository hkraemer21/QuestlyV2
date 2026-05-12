<script>
import { useAuthStore } from '../stores/AuthStore.js';
import { useAchievementStore } from '../stores/AchievementStore.js';
import { useGameStore } from '../stores/GameStore.js';
import waypointIcon from '../images/waypoint.png';
import waypointFilledIcon from '../images/waypoint-filled.png';
import EditAchievementModal from './modals/EditAchievementModal.vue';

export default {
    name: "AchievementListItem",

    setup() {
        const authStore = useAuthStore();
        const achievementStore = useAchievementStore();
        const gameStore = useGameStore();

        return { 
            authStore, 
            gameStore,
            achievementStore, 
            waypointIcon, 
            waypointFilledIcon  
        };
    },

    components: {
        EditAchievementModal,
    },

    props: {
        achievement: {
            type: Object,
            required: true
        },
    },

    data: function () {
        return {
            
        };
    },

    methods: {
        togglePinned() {
            if (!this.authStore.currentUser || !this.gameStore.selectedGame || !this.achievement) return;
            this.achievementStore.togglePinAchievement(this.authStore.currentUser, this.gameStore.selectedGame, this.achievement);
        },

        toggleComplete() {
            if (!this.authStore.currentUser || !this.gameStore.selectedGame || !this.achievement) return;
            this.achievementStore.toggleCompleteAchievement(this.authStore.currentUser, this.gameStore.selectedGame, this.achievement);
        },
    },

};
</script>

<template>

    <li>

        <hr>
        
        <div class="row p-0 m-0">
            <div class="col-1 p-0 d-flex align-items-start justify-content-center">
                <button @click.prevent="togglePinned" class="edit-btn">
                    <img class="pin-img d-block p-0" :src="achievement.isPinned ? waypointFilledIcon : waypointIcon" alt="Pin Game">
                </button>
            </div>

            <div class="col-9 mb-2 p-0 d-flex flex-column justify-content-center overflow-hidden">
                <h4 class="fs-2 body fw-bold text-break m-0 ms-1 pb-1">{{ achievement.name }}</h4>
                <p class="fs-5 m-0 body ms-1 pb-1">{{ achievement.description }}</p>
                <p class="fs-6 m-0 body ms-1" v-if="achievement.isIncremental">Repeat {{ achievement.increment }} times</p>
            </div>

            <div class="col-2 m-0 p-0 d-flex justify-content-center">
                <div class="row w-100 m-0 p-0 gap-1">
                    <div class="col-12 p-0">
                        <div class="d-flex align-items-center justify-content-center">
                            <input type="checkbox" :checked="achievement.isComplete" @change="toggleComplete" name="complete" class="complete-checkbox">
                        </div>
                    </div>
                    <div class="col-12p-0 d-flex align-items-center justify-content-center">
                        <button @click.prevent="$refs.editAchievementModal.open()" class="edit-btn">
                            <img class="quill-img d-block p-0" src="../images/quill.png" alt="Edit Achievement">
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </li>

    <edit-achievement-modal ref="editAchievementModal" :achievement="achievement" 
        @achievement-updated="achievementStore.fetchAchievements(authStore.currentUser, gameStore.selectedGame)"
        ></edit-achievement-modal>

</template>