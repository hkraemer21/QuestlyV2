import {collection, doc, getDoc, getDocs, addDoc, deleteDoc, onSnapshot, setDoc, query, where, orderBy} from "firebase/firestore";
import GameCollection from "../GameCollection.js";

import Game from "../models/Game.js";
import Achievement from "../models/Achievement.js";

export default class AchievementCollection {
    static COLLECTION_NAME = 'achievements';

    /**
     * @param {Game} game
     * @returns {Promise<*>}
     */

    static async getAchievements(game) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(game);
        const docsSnap = await getDocs(achievementsCollection.withConverter(Achievement));
        return docsSnap.docs.map(doc => doc.data());
    }   


    /**
     * @param {Game} game
     * @param {Achievement[]} achievements
     */
    static syncAchievements(game, achievements) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(game);
        const achievementsQuery = query(
            achievementsCollection, 
            orderBy('dateCompleted', 'asc')
        ).withConverter(Achievement);
        onSnapshot(achievementsQuery, snapshot => {
                achievements.splice(0, achievements.length);
                snapshot.forEach(doc => {
                    achievements.push(doc.data());
                })
            }
        );
    }

    /**
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static async setMeal(game, achievement) {
        const achievementDoc = AchievementCollection.getAchievementDoc(game, achievement);
        return setDoc(achievementDoc, achievement.toFirestore());
    }

    /**
     * @param {Game} game
     */
    static getAchievementsCollection(game) {
        const gameDocRef = GameCollection.getGameDoc(game);
        return collection(gameDocRef, AchievementCollection.COLLECTION_NAME);
    }

    /**
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static getAchievementDoc(game, achievement) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(game);
        return doc(achievementsCollection, achievement.id);
    }

    /**
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static async deleteMeal(game, achievement) {
        const achievementDoc = AchievementCollection.getAchievementDoc(game, achievement);
        return deleteDoc(achievementDoc);
    }

    /**
     * @param {Game} game
     * @param {Achievement} achievement
     */
    static async addAchievement(game, achievement) {
        const achievementsCollection = AchievementCollection.getAchievementsCollection(game);
        return addDoc(achievementsCollection, achievement.toFirestore());
    }



}
