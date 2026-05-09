import {db} from '../firebase';
import {collection, doc, getDoc, setDoc, onSnapshot, query, where, orderBy} from "firebase/firestore";
import User from "../models/User.js";
import Game from "../models/Game.js";

export default class UserCollection {
    static COLLECTION_NAME = 'users';

    /**
     * @param {string} uid
     */
    static async getUser(uid){
        const userDocRef = UserCollection.getUserDoc(uid);
        const userDocSnap = await getDoc(userDocRef.withConverter(User))
        return userDocSnap;
    }

    static syncUser(uid, user){
        const userDocRef = UserCollection.getUserDoc(uid);
        onSnapshot(userDocRef.withConverter(User), docSnap => {
            const data = docSnap.data();
            if (data) {
                Object.assign(user, data);
            }

        });
    }

    /**
     * @param {User} user
     */
    static async setUser(user){
        const userDocRef = UserCollection.getUserDoc(user.id);
        return setDoc(userDocRef, user.toFirestore());
    }

    /**
     * @param {string} uid
     */
    static getUserDoc(uid){
        return doc(UserCollection.getUsersCollection(), uid);
    }

    static getUsersCollection(){
        return collection(db, UserCollection.COLLECTION_NAME);
    }
}