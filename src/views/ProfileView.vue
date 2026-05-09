<script>

import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/AuthStore.js';

export default {
    name: "ProfileView",

    setup() {
        const authStore = useAuthStore();
        return { authStore };
    }
}


</script>

