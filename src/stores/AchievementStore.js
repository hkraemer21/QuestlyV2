import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import AchievementCollection from '../firebase/AchievementCollection.js';
import GameCollection from '../firebase/GameCollection.js';

export const useAchievementStore = defineStore('achievementStore', () => {

    const achievements = ref([]);

    const fetchAchievements = async (user, game) => {
        try {
            if (!user || !game) {
                achievements.value = [];
                return;
            }  
            achievements.value = await AchievementCollection.getSortedAchievements(user, game);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            achievements.value = [];
        }
    };

    const getAchievement = async (user, game, achievementId) => {
        try {
            if (!user || !game || !achievementId) return null;
            return await AchievementCollection.getAchievement(user, game, achievementId);
        } catch (error) {
            console.error('Error fetching achievement:', error);
            return null;
        }
    };

    const getNumberOfAchievements = async (user, game) => {
        try {
            if (!user || !game) return 0;
            return await AchievementCollection.getNumberOfAchievements(user, game);
        } catch (error) {
            console.error('Error fetching number of achievements:', error);
            return 0;
        }
    };

    const getNumberOfCompletedAchievements = async (user, game) => {
        try {
            if (!user || !game) return 0;
            return await AchievementCollection.getNumberOfCompletedAchievements(user, game);
        } catch (error) {
            console.error('Error fetching number of completed achievements:', error);
            return 0;
        }
    };

    const togglePinAchievement = async (user, game, achievement) => {
        if (!user || !game || !achievement) return;
        achievement.isPinned = !achievement.isPinned;
        await AchievementCollection.setAchievement(user, game, achievement);
        await fetchAchievements(user, game);
    };

    const toggleCompleteAchievement = async (user, game, achievement) => {
        if (!user || !game || !achievement) return;
        achievement.isComplete = !achievement.isComplete;
        achievement.dateCompleted = achievement.isComplete ? new Date().toISOString() : '';
        await AchievementCollection.setAchievement(user, game, achievement);
        await fetchAchievements(user, game);
    };

    const toggleFavoriteAchievement = async (user, game, achievement) => {
        if (!user || !game || !achievement) return;
        achievement.isFavorited = !achievement.isFavorited;
        await AchievementCollection.setAchievement(user, game, achievement);
    };

    const addAchievement = async (user, game, achievement) => {
        try {
            if (!user || !game || !achievement) return;
            const achievementModel = typeof achievement.toFirestore === 'function'
                ? achievement
                : achievement;

            await AchievementCollection.addAchievement(user, game, achievementModel);
            await fetchAchievements(user, game);
        } catch (error) {
            console.error('Error adding achievement:', error);
        }
    };

    const updateAchievement = async (user, game, achievement) => {
        try {
            if (!user || !game || !achievement) return;
            await AchievementCollection.setAchievement(user, game, achievement);
            const index = achievements.value.findIndex(a => a.id === achievement.id);
            if (index !== -1) {
                achievements.value[index] = achievement;
            }
        } catch (error) {
            console.error('Error updating achievement:', error);
        }
    };

    const fetchAllFavoriteAchievements = async (user) => {
        try {
            if (!user) return [];
            const userGames = await GameCollection.getGames(user);
            return await AchievementCollection.getAllFavoriteAchievements(user, userGames);
        } catch (error) {
            console.error('Error fetching all favorite achievements:', error);
            return [];
        }
    };

    const deleteAchievement = async (user, game, achievementId) => {
        try {
            if (!user || !game || !achievementId) return;
            await AchievementCollection.deleteAchievement(user, game, { id: achievementId });
            achievements.value = achievements.value.filter(a => a.id !== achievementId);
        } catch (error) {
            console.error('Error deleting achievement:', error);
        }
    };

    const numberOfAchievementsComputed = computed(() => achievements.value.length);

    const numberOfCompletedAchievementsComputed = computed(() => {
        return achievements.value.filter(a => a.isComplete).length;
    });



    return { 
        achievements,
        fetchAchievements,
        togglePinAchievement,
        getNumberOfAchievements,
        getNumberOfCompletedAchievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        getAchievement,
        toggleCompleteAchievement,
        toggleFavoriteAchievement,
        fetchAllFavoriteAchievements,
        numberOfAchievementsComputed,
        numberOfCompletedAchievementsComputed,
     };

});

export default useAchievementStore;