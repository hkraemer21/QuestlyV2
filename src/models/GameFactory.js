import Game from '../models/Game.js';


export default class GameFactory {

    static createGameFromUserInput(userInput) {
        const game = new Game();
        game.title = userInput.title;
        game.platform = userInput.platform;
        game.imageURL = userInput.imageURL;
        

        return game;
    }

    static createGameFromSteamAPI(steamAPIData) {

        const game = new Game();


    }

}