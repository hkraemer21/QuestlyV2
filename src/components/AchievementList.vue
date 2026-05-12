<script>
import { computed, watch } from 'vue';
import AchievementListItem from "./AchievementListItem.vue";
import { useAuthStore } from '../stores/AuthStore.js';
import { useGameStore } from '../stores/GameStore.js';
import { useAchievementStore } from '../stores/AchievementStore.js';
import AddAchievementModal from './modals/AddAchievementModal.vue';

export default {
    name: "AchievementList",

    setup() {
        const authStore = useAuthStore();
        const gameStore = useGameStore();
        const achievementStore = useAchievementStore();

        const achievements = computed(() => achievementStore.achievements);

        watch(
            () => [authStore.currentUser, gameStore.selectedGame],
            ([currentUser, selectedGame]) => {
                achievementStore.fetchAchievements(currentUser, selectedGame);
            },
            { immediate: true }
        );

        return { authStore, gameStore, achievementStore, achievements };
    },

    components: {
        AchievementListItem,
        AddAchievementModal,
    },

    props: {
        

    },
};

</script>

<template>

    <div class="parchment-background body w-100 mb-5 pb-4">

        <div class="container p-3">

            <div class="row d-flex align-items-center justify-content-center position-relative">
                <div class="col-2"></div>
                <div class="col-8">
                    <h2 class="header fw-bold text-center">Achievements</h2>
                </div>
                <div class="col-2 ">
                    <button class="btn header btn-sm edit-btn position-absolute top-0 end-0 pe-2"
                        @click="$refs.addAchievementModal.open()">
                        <img class="add-achievement-icon" src="../images/black-shield-plus.png" alt="Add Achievement">
                
                    </button>
                </div>
            </div>
            <img src="../images/game-divider.png" alt="" class="divider-img d-block mx-auto">
        </div>

        <div class="container">

            <ul class="" v-if="achievements.length > 0">

                <achievement-list-item
                    v-for="(achievement, index) in achievements"
                    :key="achievement.id || `${index}`"
                    :achievement="achievement"
                ></achievement-list-item>

            </ul>
            <p v-else class="text-center body fw-bold">Add your achievements here!</p>
        </div>

    </div>

    <add-achievement-modal ref="addAchievementModal"></add-achievement-modal>
  
</template>