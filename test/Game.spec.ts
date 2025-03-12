import { Card } from "../src/app/classes/Card";
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
        expect(playerWith2ofClubs?.isTurn).toBe(true);
        expect(remainingPlayers.every(player => !player.isTurn)).toBe(true);
    });

    test('update game removes card from player', () => {
        game.beginNewRound();
        const startingPlayer = game.players.find(player => player.isTurn);
        const startingPlayerIndex = game.players.indexOf(startingPlayer!);
        const updatedGame = game.updateGame(startingPlayer!.hand.find(card => card.face === Face.Two && card.suit === Suit.Clubs)!, startingPlayer!.id);
        expect(updatedGame.players[startingPlayerIndex].hand.length).toBe(12);
        expect(updatedGame.players[(startingPlayerIndex + 1) % 4].isTurn).toBe(true);
    });

    test('After round, winningPlayer has points', () => {
        game.beginNewRound();

        game.players[0].hand = [
            new Card(Face.Two, Suit.Clubs, game.players[0].id),
        ]
        game.players[1].hand = [
            new Card(Face.Ace, Suit.Hearts, game.players[1].id),
        ]
        game.players[2].hand = [
            new Card(Face.King, Suit.Clubs, game.players[2].id),
        ]
        game.players[3].hand = [
            new Card(Face.Queen, Suit.Spades, game.players[3].id),
        ]
        game.players.forEach(player => player.isTurn = false);
        game.players[0].isTurn = true;
        for (let i = 0; i < 4; i++) {
            game.updateGame(game.players[i].hand[0], game.players[i].id);
        }
        expect(game.players[2].totalPoints).toBe(13);
        expect(game.players[2].tricksWon).toBe(1);
        expect(game.players[2].isTurn).toBe(true);
    });
});