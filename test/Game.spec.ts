import Game from "../src/app/classes/Game";
import { Face } from "../src/app/enums/Face";
import { Suit } from "../src/app/enums/Suits";

describe('Game', () => {
    const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
    const game = new Game(playerNames);

    test('should create players with names', () => {
        expect(game.players.map(player => player.name)).toEqual(playerNames);
    });

    test('begin new round should deal cards', () => {
        game.beginNewRound();
        expect(game.players.every(player => player.hand.length === 13)).toBe(true);
    });

    test('begin new round should have player with 2 of clubs start', () => {
        game.beginNewRound();
        const playerWith2ofClubs = game.players.find(player =>
            player.hand.some(card => card.face === Face.Two && card.suit === Suit.Clubs));
        const remainingPlayers = game.players.filter(player => player !== playerWith2ofClubs);
        console.log(playerWith2ofClubs);
        console.log(remainingPlayers);
        expect(playerWith2ofClubs?.isTurn).toBe(true);
        expect(remainingPlayers.every(player => !player.isTurn)).toBe(true);
    });
});