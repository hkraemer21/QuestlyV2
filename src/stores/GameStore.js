import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import GameCollection from '../firebase/GameCollection.js';

export const useGameStore = defineStore('gameStore', () => {
    const games = ref([]);
    const selectedGame = ref(null);

    const pinnedGames = computed(() => games.value.filter(game => game.isPinned));

    const fetchGames = async (user) => {
        try {
            if (!user) {
                games.value = [];
                return;
            }

            games.value = await GameCollection.getGames(user);
        } catch (error) {
            console.error('Error fetching games:', error);
            games.value = [];
        }
    };

    const setCurrentGame = (game) => {
        selectedGame.value = game;
    };

    const setCurrentGameById = (gameId) => {
        selectedGame.value = games.value.find(g => g.id === gameId) ?? null;
    };

    const togglePinGame = async (user, game) => {
        if (!game) return;
        game.isPinned = !game.isPinned;
        await GameCollection.setGame(user, game);
    };

    const addGame = async (user, game) => {
        try {
            if (!user) return;

            await GameCollection.addGame(user, game);
            await fetchGames(user);
        } catch (error) {
            console.error('Error adding game:', error);
        }
    };

    const updateGame = async (user, game) => {
        try {
            if (!user) return;

            await GameCollection.setGame(user, game);
            const index = games.value.findIndex(g => g.id === game.id);
            if (index !== -1) {
                games.value[index] = game;
            }
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };

    const deleteGame = async (user, gameId) => {
        try {
            if (!user) return;

            await GameCollection.deleteGame(user, { id: gameId });
            games.value = games.value.filter(g => g.id !== gameId);
        } catch (error) {
            console.error('Error deleting game:', error);
        }    
    };

    return { 
        games, 
        selectedGame, 
        pinnedGames, 
        fetchGames, 
        setCurrentGame, 
        setCurrentGameById, 
        addGame, 
        updateGame, 
        deleteGame, 
        togglePinGame };

});

export default useGameStore;