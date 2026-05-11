import {collection, doc, getDocs, addDoc, deleteDoc, onSnapshot, setDoc, query, where, orderBy, getDoc} from "firebase/firestore";
import GameCollection from "../firebase/GameCollection.js";

import Game from "../models/Game.js";
import Achievement from "../models/Achievement.js";

export default class AchievementCollection {
    static COLLECTION_NAME = 'achievements';

    /**
     * @param {User} user
     * @param {Game} game
     * @returns {Promise<*>}
     */
    static async getAchievements(user, game) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(user, game);
        const docsSnap = await getDocs(achievementsCollection.withConverter(Achievement));
        return docsSnap.docs.map(doc => doc.data());
    }

    static async getAchievement(user, game, achievementId) {
        const achievementDoc = AchievementCollection.getAchievementDoc(user, game, { id: achievementId });
        const docSnap = await getDoc(achievementDoc.withConverter(Achievement));
        return docSnap.exists() ? docSnap.data() : null;
    }

    static async getSortedAchievements(user, game) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(user, game);
        const achievementsQuery = query(
            achievementsCollection,
            orderBy('isPinned', 'desc')
        ).withConverter(Achievement);
        const docsSnap = await getDocs(achievementsQuery);
        return docsSnap.docs.map(doc => doc.data()).sort((a, b) => {
            if (a.isComplete === b.isComplete) return 0;
            return a.isComplete ? 1 : -1;
        });
    }

    static async getNumberOfAchievements(user, game) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(user, game);
        const docsSnap = await getDocs(achievementsCollection);
        return docsSnap.size;
    }

    static async getNumberOfCompletedAchievements(user, game) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(user, game);
        const completedAchievementsQuery = query(
            achievementsCollection,
            where('isComplete', '==', true)
        ).withConverter(Achievement);
        const docsSnap = await getDocs(completedAchievementsQuery);
        return docsSnap.size;
    }

    /**
     * @param {User} user
     * @param {Game} game
     * @param {Achievement[]} achievements
     */
    static syncAchievements(user, game, achievements) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(user, game);
        const achievementsQuery = query(
            achievementsCollection,
            orderBy('isPinned', 'asc')
        ).withConverter(Achievement);
        onSnapshot(achievementsQuery, snapshot => {
            achievements.splice(0, achievements.length);
            snapshot.forEach(doc => {
                achievements.push(doc.data());
            });
        });
    }

    /**
     * @param {User} user
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static async setAchievement(user, game, achievement) {
        const achievementDoc = AchievementCollection.getAchievementDoc(user, game, achievement);
        return setDoc(achievementDoc, achievement.toFirestore());
    }

    /**
     * @param {User} user
     * @param {Game} game
     */
    static getAchievementsCollection(user, game) {
        const gameDocRef = GameCollection.getGameDoc(user, game);
        return collection(gameDocRef, AchievementCollection.COLLECTION_NAME);
    }

    /**
     * @param {User} user
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static getAchievementDoc(user, game, achievement) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(user, game);
        return doc(achievementsCollection, achievement.id);
    }

    /**
     * @param {User} user
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static async deleteAchievement(user, game, achievement) {
        const achievementDoc = AchievementCollection.getAchievementDoc(user, game, achievement);
        return deleteDoc(achievementDoc);
    }

    /**
     * @param {User} user
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static async addAchievement(user, game, achievement) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(user, game);
        return addDoc(achievementsCollection, achievement.toFirestore());
    }

    /**
     * @param {User} user
     * @param {Game[]} userGames
     * @returns {Promise<Achievement[]>}
     */
    static async getAllFavoriteAchievements(user, userGames) {
        try {
            if (!user || !userGames || userGames.length === 0) {
                return [];
            }

            let allFavoriteAchievements = [];

            for (const game of userGames) {
                const achievements = await AchievementCollection.getAchievements(user, game);
                const favoriteAchievements = achievements.filter(achievement => achievement.isFavorited);
                favoriteAchievements.forEach(achievement => {
                    achievement.gameTitle = game.title;
                    achievement.gameId = game.id;
                });
                allFavoriteAchievements = allFavoriteAchievements.concat(favoriteAchievements);
            }

            return allFavoriteAchievements;
        } catch (error) {
            console.error('Error fetching all favorite achievements:', error);
            return [];
        }
    }
}
