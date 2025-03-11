import Game from "../src/app/classes/Game";

describe('Game', () => {
    const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
    const game = new Game(playerNames);

    test('should create players with names', () => {
        expect(game.players.map(player => player.name)).toEqual(playerNames);
    });
});