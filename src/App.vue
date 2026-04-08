<script>

import { Item, Game, Achievement, ItemCollection } from "./models.vue";
import GameList from "./components/GameList.vue";
import GameListMobile from "./components/GameListMobile.vue";
import AchievementList from "./components/AchievementList.vue";
import AddGameModal from "./components/AddGameModal.vue";
import waypointIcon from "./images/waypoint.png";
import waypointFilledIcon from "./images/waypoint-filled.png";

export default {

  components: {
      GameList,
      GameListMobile,
      AchievementList,
      AddGameModal,
  },

  data: function () {
      return {
          waypointIcon,
          waypointFilledIcon,

          selectedGame: null,

          gameList: new ItemCollection()
            .addItem(new Game('Resident Evil 2 Remake', 'https://bigrednerd.com/wp-content/uploads/2025/01/udfogvnmttclvmtwjj0njgwc2488844306262883277.jpeg', 'PC',
                new ItemCollection()
                    .addItem(new Achievement('Welcome to Raccoon City', 'Complete the game on any difficulty.').toggleFavorite())
                    .addItem(new Achievement('Survivor', 'Complete the game on Normal or higher difficulty.').togglePin())
                    .addItem(new Achievement('Master of Unlocking', 'Unlock all the weapons and items in the game.'))).togglePin())
            .addItem(new Game('God of War: Ragnarok', 'https://djmmtgamechangerdoc.wordpress.com/wp-content/uploads/2022/10/god-of-war-ragnarok-cover.jpg?w=1920', 'PS5',
                new ItemCollection()
                    .addItem(new Achievement('Ragnarok Unleashed', 'Complete the game on any difficulty.'))
                    .addItem(new Achievement('Valhalla Conqueror', 'Complete the game on Hard difficulty.'))
                    .addItem(new Achievement('Mythical Collector', 'Collect all the collectibles in the game.').toggleFavorite())))
            .addItem(new Game('The Last of Us Part II', 'https://images.g2a.com/323x433/1x1x1/the-last-of-us-part-ii-remastered-p10000503120/7038c548cc6e48a49931a751', 'PS5',
                new ItemCollection()
                    .addItem(new Achievement('Survivor', 'Complete the game on any difficulty.'))
                    .addItem(new Achievement('Master of Stealth', 'Complete the game using only stealth tactics.').toggleFavorite())
                    .addItem(new Achievement('Collector', 'Collect all the collectibles in the game.')))),

            


          isPinHovered: false,

      };
  },


  methods: {

      selectGame: function (game) {
          this.selectedGame = game;
      },


  },


  computed: {
      favoritedGames: function () {
          return this.gameList.filter(game => game.isFavorited());
      },

      pinnedGames: function () {
          return this.gameList.filter(game => game.isPinned());
      },

      favoritedAchievements: function () {
          if (this.selectedGame) {
              return this.selectedGame.achievements.filter(achievement => achievement.isFavorited());
          }
          return [];
      },

      // sorting achievements with pinned at the top and completed at the bottom, while keeping the rest in their original order
      sortedAchievements: function () {
          if (this.selectedGame) {
              return this.selectedGame.achievements.slice().sort((a, b) => {
                  if (a.isPinned() && !b.isPinned()) {
                      return -1;
                  } else if (!a.isPinned() && b.isPinned()) {
                      return 1;
                  } else if (a.isComplete() && !b.isComplete()) {
                      return 1;
                  } else if (!a.isComplete() && b.isComplete()) {
                      return -1;
                  } else {
                      return 0;
                  }
              });
          }
      },

      allFavoritedAchievements: function () {
          let favorited = [];
          this.gameList.forEach(game => {
              favorited = favorited.concat(game.achievements.filter(achievement => achievement.isFavorited()));
          });
          return favorited;
      },

  },


  mounted: function () {
    //   if (localStorage.getItem('gameList')) {
    //       this.gameList = JSON.parse(localStorage.getItem('gameList'));
    //   }

  },


  watch: {
      gameList: {
          handler: function (newVal, oldVal) {
              localStorage.setItem('gameList', JSON.stringify(newVal));
          },
          deep: true
      }
  },
}

</script>

<template>
  <div class="wooden-background">

    <div class="container-fluid">

        <ul class="nav nav-underline navigation bg-black bg-opacity-75 justify-content-center">
            <li class="nav-item">
                <a class="brand-name m-1" href="home.html"><img class="logo" src="./images/scroll-icon-6.png"
                        alt="">Questly</a>
            </li>
        </ul>

        <div class="row min-vh-100">

            <div class="col-1">

            </div>

            <div
                class="col-12 col-md-10 parchment-background d-flex flex-column align-items-center justify-content-start">

                <h1 class="text-black text-center p-3 header">Start tracking your achievements</h1>
                <img src="./images/header-divider.png" alt="header divider" class="header-divider mb-4">

                <div class="container-fluid border border-black mb-4 w-100">

                    <div class="row">

                        <!--  game title nav list -->
                        <div class="col-12 col-md-3 border border-2 border-black pt-4">

                            <div class="text-center">
                                <button
                                class="btn header fs-4 border border-2 border-black bg-black text-white rounded-0 w-75 p-2 ps-2 pe-2"
                                data-bs-toggle="modal" data-bs-target="#addGameModal" title="Add Game">Add
                                Game</button>
                            </div>
                            <img src="./images/game-title-divider.png" alt="header divider"
                                class="game-divider mb-2">

                            <!-- desktop version of game list -->
                            <div class="ps-1 pe-1 desktop">
                                <game-list name="Pinned Games" :list-of-items="pinnedGames"
                                    @select-game="selectGame"></game-list>

                                <p class="text-center"><i class="bi bi-suit-diamond-fill"></i></p>


                                <game-list name="All Games" :list-of-items="gameList"
                                    @select-game="selectGame"></game-list>
                            </div>

                            <!-- mobile version of game list -->
                            <div class="accordion mb-3 mobile" id="mobileGameList">
                                <game-list-mobile name="Pinned Games" :list-of-items="pinnedGames"
                                    :id="'pinnedGames'" @select-game="selectGame"></game-list-mobile>

                                <game-list-mobile name="All Games" :id="'allGames'" :list-of-items="gameList"
                                    @select-game="selectGame"></game-list-mobile>

                            </div>

                        </div>

                        <!-- displays selected game details -->
                        <div
                            class="col-12 col-md-9 border border-2 border-black d-flex flex-column align-items-center justify-content-start ">

                            <div id="selectedGameInfo" v-if="selectedGame" class="p-3">

                                <!-- game info -->
                                <div class="text-center">
                                    <div class="row">
                                        <div class="col-1 position-relative ">
                                            <a href="" class="position-absolute top-0 start-0 text-black"
                                                @click.prevent="selectedGame.pin();">
                                                <img :src="selectedGame.isPinned() ? waypointFilledIcon : waypointIcon"
                                                    alt="" class="pin-img">
                                            </a>
                                        </div>
                                        <div class="col-1 position-relative ">
                                        </div>
                                        <div class="col-8">
                                            <h2 class="text-break header">{{ selectedGame.name }} <i
                                                    @click.prevent="gameList.deleteItem(selectedGame)"
                                                    class="btn-icon bi bi-trash2-fill"></i>
                                            </h2>
                                        </div>
                                        <div class="col-1 position-relative ">
                                        </div>
                                        <div class="col-1 position-relative">
                                            <button type="button"
                                                class="position-absolute top-0 end-0 text-black edit-btn"
                                                @click="openEditGame(selectedGame)"
                                                data-bs-toggle="modal" data-bs-target="#editGameModal">
                                                <img src="./images/quill.png" alt="" class="quill-img">
                                            </button>
                                        </div>
                                    </div>
                                    <p class="mb-2 body"><strong>Platform:</strong> {{ selectedGame.platform }}</p>
                                    <div class="game-img-wrap">
                                        <img :src="selectedGame.image" :alt="selectedGame.name + ' image'"
                                            class="game-img mb-2">
                                    </div>
                                    <img src="./images/game-divider.png" alt="" class="game-divider">
                                </div>

                                <!-- achievements -->

                                <achievement-list name="Achievements" :list-of-items="sortedAchievements" :game="selectedGame"
                                    @edit-achievement="openEditAchievement">
                                </achievement-list>

                            </div>

                            <!-- displays all favorited achievements by default if no game is selected -->
                            <div v-else class="p-3">
                                <div class="">
                                    <h3 class="text-center fs-2 mt-5 header">Featured Favorites</h3>
                                    <img src="./images/game-divider.png" alt="" class="game-divider">

                                    <div class="container">
                                        <ul class="ps-2" v-for="(achievement, a) in allFavoritedAchievements"
                                            :key="achievement.name">

                                            <li class="mt-3 text-break">
                                                <hr>

                                                <div class="row body">

                                                    <div class="col-10">
                                                        <strong class="fs-3">{{ achievement.name }}</strong>
                                                        <p class="fs-5">{{ achievement.description }}</p>
                                                    </div>

                                                    <div class="col-2 p-0">
                                                        <i class="h-100 d-flex align-items-center justify-content-center fs-3"
                                                            :class="achievement.complete ? 'bi bi-check-square' : 'bi bi-square'"></i>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>


                                </div>
                            </div>

                        </div>

                    </div>


                </div>

            </div>

            <div class="col-1"></div>

        </div>



        <!-- add game modal -->
        <!-- <div class="modal fade" id="addGameModal" tabindex="-1" role="dialog" aria-labelledby="GameModal"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="addNewGame()" class="modal-content">
                    <div class="modal-content parchment-background border border-black rounded-0">
                        <div class="modal-header border border-black rounded-0">
                            <h5 class="modal-title text-center header" id="modalTitle">Add Game</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body border border-black">
                            <div class="mb-3">
                                <label for="title" class="form-label body">Title</label>
                                <input id="title" type="text" class="form-control" v-model="newGame.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label body">Platform</label>
                                <select id="category" class="form-select" v-model="newGame.platform" required>
                                    <option value="" disabled>Choose one</option>
                                    <option value="Steam">Steam</option>
                                    <option value="Xbox">Xbox</option>
                                    <option value="PlayStation">PlayStation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="image" class="form-label body">Image Link</label>
                                <input id="image" type="text" class="form-control" v-model="newGame.image"
                                    placeholder="https://placehold.co/300x400" required>
                            </div>
                        </div>
                        <div class="modal-footer border border-black rounded-0">
                            <button type="submit" class="btn submit-btn header">Add Game</button>
                            <button type="button" class="btn text-decoration-underline fw-bold header" data-bs-dismiss="modal">Nevermind</button>
                        </div>
                    </div>
                </form>
            </div>
        </div> -->

        <!-- edit game modal -->
        <!-- <div class="modal fade" id="editGameModal" tabindex="-1" role="dialog" aria-labelledby="GameModal"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="saveEditedGame()" class="modal-content">
                    <div class="modal-content parchment-background border border-black rounded-0">
                        <div class="modal-header border border-black rounded-0">
                            <h5 class="modal-title text-center header" id="modalTitle">Edit Game</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body border border-black">
                            <div class="mb-3">
                                <label for="title" class="form-label body">Title</label>
                                <input id="title" type="text" class="form-control" v-model="editGameForm.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label body">Platform</label>
                                <select id="category" class="form-select" v-model="editGameForm.platform" required>
                                    <option value="" disabled>Choose one</option>
                                    <option value="PC">PC</option>
                                    <option value="PS5">PS5</option>
                                    <option value="Xbox">Xbox</option>
                                    <option value="PlayStation">PlayStation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="image" class="form-label body">Image Link</label>
                                <input id="image" type="text" class="form-control" v-model="editGameForm.image"
                                    placeholder="https://placehold.co/300x400" required>
                            </div>
                        </div>
                        <div class="modal-footer border border-black rounded-0">

                            <button type="submit" class="btn submit-btn header">Save Changes</button>
                            <button type="button" class="btn" data-bs-dismiss="modal">Nevermind</button>
                        </div>
                    </div>
                </form>
            </div>
        </div> -->

        <!-- add achievement modal -->
        <!-- <div class="modal fade" id="addAchievementModal" tabindex="-1" role="dialog"
            aria-labelledby="AchievementModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="addNewAchievement(selectedGame)" class="modal-content">
                    <div class="modal-content parchment-background border border-black rounded-0">
                        <div class="modal-header">
                            <h5 class="modal-title text-center header" id="modalTitle">Add Achievement</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body border border-black">
                            <div class="mb-3">
                                <label for="name" class="form-label body">Name</label>
                                <input id="name" type="text" class="form-control" v-model="newAchievement.name"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label body">Description</label>
                                <textarea id="description" class="form-control" aria-label="With textarea"
                                    v-model="newAchievement.description" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="times" class="form-label body"># of times</label>
                                <input id="times" type="number" class="form-control" v-model="newAchievement.times">
                            </div>
                        </div>
                        <div class="modal-footer border border-black rounded-0 position-relative">
                            <button type="button" class="btn fs-2 position-absolute top-0 start-0"><i class="btn-icon"
                                :class="newAchievement.favorite ? 'bi bi-star-fill' : 'bi bi-star'"
                                @click.prevent="favoriteAchievement(newAchievement)"></i>
                            </button>
                            <button type="submit" class="btn submit-btn header">Add Achievement</button>
                            <button type="button" class="btn text-decoration-underline fw-bold header" data-bs-dismiss="modal">Nevermind</button>
                        </div>
                    </div>
                </form>
            </div>
        </div> -->

        <!-- edit achievement modal -->
        <!-- <div class="modal fade" id="editAchievementModal" tabindex="-1" role="dialog"
            aria-labelledby="AchievementModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="saveEditedAchievement()" class="modal-content">
                    <div class="modal-content parchment-background border border-black rounded-0">
                        <div class="modal-header">
                            <h5 class="modal-title text-center header" id="modalTitle">Edit Achievement</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body border border-black">
                            <div class="mb-3">
                                <label for="name" class="form-label body">Name</label>
                                <input id="name" type="text" class="form-control" v-model="editAchievementForm.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label body">Description</label>
                                <textarea id="description" class="form-control" aria-label="With textarea"
                                    v-model="editAchievementForm.description" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="times" class="form-label body"># of times</label>
                                <input id="times" type="number" min="0" class="form-control" v-model="editAchievementForm.increment" required>
                            </div>
                        </div>
                        <div class="modal-footer border border-black rounded-0 position-relative">
                            <button type="button" class="btn fs-2 position-absolute top-0 start-0"><i class="btn-icon"
                                :class="editAchievementForm.favorite ? 'bi bi-star-fill' : 'bi bi-star'"
                                @click.prevent="editAchievementForm.favorite = !editAchievementForm.favorite"></i>
                            </button>
                            <button type="submit" class="btn submit-btn header">Save Changes</button>
                            <button type="button" class="btn text-decoration-underline fw-bold header" data-bs-dismiss="modal">Nevermind</button>
                        </div>
                    </div>
                </form>
            </div>
        </div> -->

    </div>


  </div>
</template>

<style scoped></style>
