<script>
import { useGameStore } from '../stores/GameStore.js';

export default {
    name: "GameItem",
    setup() {
        const gameStore = useGameStore();
            

        return { gameStore };
    },

    props: {
        game: { type: Object, required: true },
    },

};

</script>

<template>

    <li class="mt-3 text-break">
        <router-link
            :to="`/game/${game.id}`"
            class="text-decoration-none text-black body fw-semibold"
            @click="$emit('select-game', game) "
        >
            {{ game.title }}
        </router-link>
        <hr>
    </li>
  
</template>