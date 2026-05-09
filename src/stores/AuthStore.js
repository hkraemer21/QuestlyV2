import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/index.js";
import UserCollection from "../firebase/UserCollection.js";
import User from "../models/User.js";
import router from "../router/index.js";

export const useAuthStore = defineStore('authStore', () => {
  const currentUser = ref(null);
  const firebaseUser = ref(null);

  const isAuthenticated = computed(() => !!firebaseUser.value);

  // Login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      firebaseUser.value = userCredential.user;

      const userSnapshot = await UserCollection.getUser(userCredential.user.uid);
      if (userSnapshot.exists()) {
        currentUser.value = userSnapshot.data();
      }

      router.push('/');
      console.log('Logged in with Google:', firebaseUser.value);
      return currentUser.value;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      firebaseUser.value = userCredential.user;

      const userSnapshot = await UserCollection.getUser(userCredential.user.uid);
      if (userSnapshot.exists()) {
        currentUser.value = userSnapshot.data();
      }

      router.push('/');
      console.log('Logged in with Google:', firebaseUser.value);
      return currentUser.value;
    } catch (error) {
      console.error('Google login error:', error.message);
      throw error;
    }
  };

  // Create account
  const createAccount = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUserData = userCredential.user;

      const newUser = new User(username, email);
      newUser.id = firebaseUserData.uid;

      await UserCollection.setUser(newUser);

      firebaseUser.value = firebaseUserData;
      currentUser.value = newUser;

      router.push('/');
      console.log('Account created:', firebaseUser.value);
      return newUser;
    } catch (error) {
      console.error('Registration error:', error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      currentUser.value = null;
      firebaseUser.value = null;
      router.push('/login');
      console.log('Logged out:', firebaseUser.value);
    } catch (error) {
      console.error('Logout error:', error.message);
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!currentUser.value) throw new Error('No user logged in');

    try {
      Object.assign(currentUser.value, updates);
      currentUser.value.id = firebaseUser.value.uid;

      await UserCollection.setUser(currentUser.value);
      return currentUser.value;
    } catch (error) {
      console.error('Update profile error:', error.message);
      throw error;
    }
  };

  // Initialize auth listener
  const initializeAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          firebaseUser.value = user;
          try {
            const userSnapshot = await UserCollection.getUser(user.uid);
            if (userSnapshot.exists()) {
              currentUser.value = userSnapshot.data();
            }
          } catch (error) {
            console.error('Failed to fetch user profile:', error);
          }
        } else {
          firebaseUser.value = null;
          currentUser.value = null;
        }
        resolve(user);
      });
    });
  };

  return {
    currentUser,
    firebaseUser,
    isAuthenticated,
    login,
    loginWithGoogle,
    createAccount,
    logout,
    updateProfile,
    initializeAuth
  };
});