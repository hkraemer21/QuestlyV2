<script>
export default {
    name: "AppHeader",

    props: {
        title: {
            type: String,
            required: true
        }
     }

}


</script>

<template>

    <div class="parchment-background app-header p-1 mt-4">
        <h1 class="text-black fw-bold text-center mt-3">{{ title }}</h1>
        <img src="../../images/header-divider.png" alt="header divider" class="header-divider mb-3 mx-auto d-block">
    </div>


</template>