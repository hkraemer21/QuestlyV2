<script>
import { useAuthStore } from '../stores/AuthStore.js';
import AchievementListItem from './AchievementListItem.vue';
import { useAchievementStore } from '../stores/AchievementStore.js';
import { ref, onMounted, watch } from 'vue';

export default {
    name: "HomeDisplay",

    setup() {
        const authStore = useAuthStore();
        const achievementStore = useAchievementStore();
        const achievements = ref([]);

            const fetchFavoriteAchievements = async () => {
                achievements.value = await achievementStore.fetchAllFavoriteAchievements(authStore.currentUser);
            };

            onMounted(() => {
                fetchFavoriteAchievements();
            });

            watch(() => authStore.currentUser, fetchFavoriteAchievements, { immediate: true });

        return { authStore, achievementStore, achievements };

        
    },

    components: {
        AchievementListItem,
    },

    data() {
        return {

        }
    },

}


</script>

<template>

    <div class="parchment-background mb-5 pb-4 body w-100">

        <div class="container">
            <h2 class="text-center header pt-4 fw-bold">Favorite Achievements</h2>
            <img src="../images/game-divider.png" alt="" class="divider-img mb-3 d-block mx-auto">
        
            <ul class="ps-2" v-for="(achievement, a) in achievements"
                :key="achievement.name">

                <li class="mt-3 text-break">

                    <div class="row body">

                        <div class="col-10">
                            <strong class="fs-3">{{ achievement.name }}</strong>
                            <p class="fs-5 m-0">{{ achievement.description }}</p>
                            <small class="text-muted">{{ achievement.gameTitle }}</small>
                        </div>

                        <div class="col-2 p-0">
                            <i class="h-100 d-flex align-items-center justify-content-center fs-3"
                                :class="achievement.isComplete ? 'bi bi-check-square' : 'bi bi-square'"></i>
                        </div>
                    </div>
                </li>

            </ul>
        </div>

            
    </div>


</template>