<script>
import AppHeader from '../components/app/AppHeader.vue';
import AppSideNav from '../components/app/AppSideNav.vue';
import EditProfile from '@/components/EditProfile.vue';

export default {
    name: "ProfileView",

    components: {
        AppHeader,
        AppSideNav,
        EditProfile,
    },
}


</script>

<template>
    <div>

        <div class="row mt-4">

            <div class="col-12 col-md-3">
                <AppSideNav></AppSideNav>
            </div>


            <div class="col-12 col-md-9">
                <EditProfile></EditProfile>
            </div>
        </div>
    </div>
</template>

