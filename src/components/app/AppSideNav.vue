<script>
export default {
    name: "AppSideNav",

}


</script>

<template>

    <div class="parchment-background mb-4">
        <div class="p-3">

            <div class="text-center">
                <button
                class="btn header mt-2 fs-4 border border-2 border-black bg-black text-white rounded-0 w-75 p-2 ps-2 pe-2"
                data-bs-toggle="modal" data-bs-target="#addGameModal" title="Add Game">Add
                Game</button>
            </div>
            <img src="../../images/game-title-divider.png" alt="header divider"
                class="game-divider mb-2">

            <!-- desktop version of game list -->
            <div class="ps-1 pe-1 desktop">

            </div>

            <!-- mobile version of game list -->
            <div class="accordion mb-3 mobile" id="mobileGameList">
                

            </div>

        </div>
    </div>


</template>