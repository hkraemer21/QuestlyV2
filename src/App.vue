<script>
import AppTopNav from './components/app/AppTopNav.vue';

export default {

    components: {
        AppTopNav,
    },
    
}

</script>

<template>

    <div class="wooden-background min-vh-100 position-relative">

        <div>
            <AppTopNav></AppTopNav>

            <div class="container-fluid body-area px-0">

                <RouterView v-if="$route && $route.name !== 'login'"></RouterView>
                <RouterView v-else/>

            </div>

            
        </div>

        <footer class="position-absolute bottom-0 w-100">
            <p>&copy; 2026 Questly. All rights reserved.</p>
        </footer>

    </div>

    

</template>