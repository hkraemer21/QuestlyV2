<script>
import { useAuthStore } from '../stores/AuthStore.js';
import AppSideNav from '../components/app/AppSideNav.vue';
import AppHeader from '../components/app/AppHeader.vue';
import AddGameForm from '../components/forms/AddGameForm.vue';


export default {
    name: "AddGameView",

    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },

    components: {
        AppSideNav,
        AppHeader,
        AddGameForm,
    },


}
</script>

<template>

    <div>
        <app-header class="w-100" :title="'Start tracking your achievements'"></app-header>

        <div class="row mt-4">

            <div class="col-12 col-md-3">
                <AppSideNav></AppSideNav>
            </div>

            <div
                class="col-12 col-md-9 d-flex flex-column align-items-center justify-content-start pb-5">   
                
                <add-game-form></add-game-form>

            </div>
            
        </div>
    </div>
    

</template>