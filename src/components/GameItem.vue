<script>

export default {
    name: "GameItem",

    props: {
        game: { type: Object, required: true },
    },
};

</script>

<template>

    <li class="mt-3 text-break">
        <a id="selectedGame" class="text-decoration-none text-black body fw-semibold"
            @click="$emit('select-game', game)">{{ game.name }}
            <hr>
        </a>
    </li>
  
</template>