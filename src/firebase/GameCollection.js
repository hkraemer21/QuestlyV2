import {collection, doc, getDoc, getDocs, setDoc, onSnapshot, query, where, orderBy, deleteDoc, addDoc} from "firebase/firestore";
import UserCollection from "../firebase/UserCollection.js";

import Game from "../models/Game.js";

export default class GameCollection {
    static COLLECTION_NAME = 'games';

    /**
     * @param {User} user
     * @returns {Promise<*>}
     */

    static async getGames(user) {
        const gameDocRef = GameCollection.getGamesCollection(user);
        const docsSnap = await getDocs(gameDocRef.withConverter(Game));
        return docsSnap.docs.map(doc => doc.data());
    }

    static async getPinnedGames(user) {
        const games = await GameCollection.getGames(user);
        return games.filter(game => game.isPinned);
    }

    /**
     * @param {User} user
     * @param {Game} game
     */
    static async setGame(user, game) {
        const gameDocRef = GameCollection.getGameDoc(user, game);
        return setDoc(gameDocRef, game.toFirestore());
    }

    /**
     * @param {User} user
     * @param {Game[]} games
     * 
     */
    static syncGames(user, games) {
        const gamesCollection = GameCollection.getGamesCollection(user);
        const gamesQuery = query(
            gamesCollection.withConverter(Game), 
            orderBy('dateCompleted', 'asc')
        ).withConverter(Game);
        onSnapshot(gamesQuery, snapshot => {
                games.splice(0, games.length);
                snapshot.forEach(doc => {
                    games.push(doc.data());
                })
            }
        );
    }

    /**
     * @param {User} user
     */
    static getGamesCollection(user) {
        const userDocRef = UserCollection.getUserDoc(user.id);
        return collection(userDocRef, GameCollection.COLLECTION_NAME);
    }

    /**
     * @param {User} user
     * @param {Game} game
     */
    static getGameDoc(user, game) {
        const gamesCollection = GameCollection.getGamesCollection(user);
        return doc(gamesCollection, game.id);
    }

    /**
     * @param {User} user
     * @param {Game} game
     */
    static async addGame(user, game) {
        const gamesCollection = GameCollection.getGamesCollection(user);
        return addDoc(gamesCollection, game.toFirestore());
    }

    /**
     * @param {User} user
     * @param {Game} game
     */
    static async deleteGame(user, game) {
        const gameDocRef = GameCollection.getGameDoc(user, game);
        return deleteDoc(gameDocRef);
    }

    


}