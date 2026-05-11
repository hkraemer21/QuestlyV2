<script>
import AppHeader from '../components/app/AppHeader.vue';
import AppSideNav from '../components/app/AppSideNav.vue';
import GameDisplay from '../components/GameDisplay.vue';

  export default {
    name: "HomeView",
    components: {
        AppHeader,
        AppSideNav,
        GameDisplay,
    },
  }
</script>

<template>

    <div>

        <div class="row mt-4">

            <div class="col-12 col-md-3">
                <AppSideNav></AppSideNav>
            </div>

            <div
                class="col-12 col-md-9 d-flex flex-column align-items-center justify-content-start pb-5">

                <GameDisplay></GameDisplay>

            </div>
            
        </div>
    </div>

</template>