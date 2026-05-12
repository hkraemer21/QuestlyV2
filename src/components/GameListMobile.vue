<script>

import { ref } from 'vue';

import GameItem from "./GameItem.vue";

export default {
    name: "GameListMobile",

    setup() {
        const isOpen = ref(false);

        const toggleAccordion = () => {
            isOpen.value = !isOpen.value;
        };

        return { isOpen, toggleAccordion };
    },

    components: {
        GameItem,
    },

    props: {        
        listOfItems: {type: Array, required: true},
        name: {type: String, required: true},
        id : {type: String, required: true},
    },
};

</script>

<template>

    <div>
        <div class="accordion-item">
            <h2 class="accordion-header ">
                <button
                    class="accordion-button header fw-bold"
                    :class="{ collapsed: !isOpen }"
                    type="button"
                    @click="toggleAccordion"
                    :aria-expanded="isOpen"
                    :aria-controls="id"
                >
                    {{ name }}
                </button>
            </h2>
            <div
                :id="id"
                class="accordion-collapse collapse"
                :class="{ show: isOpen }"
            >
                <div class="accordion-body">
                    <ul class="ps-2">

                        <game-item
                            v-for="(game, index) in listOfItems"
                            :key="game.id"
                            :game="game"
                            @select-game="$emit('select-game', game)"              
                        ></game-item>

                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>