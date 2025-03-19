/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/classes/Card.ts":
/*!*********************************!*\
  !*** ./src/app/classes/Card.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: () => (/* binding */ Card)
/* harmony export */ });
class Card {
    constructor(face, suit, ownerId) {
        this.ownerId = ownerId;
        this.suit = suit;
        this.face = face;
    }
    addOwner(ownerId) {
        this.ownerId = ownerId;
    }
    removeOwner() {
        this.ownerId = undefined;
    }
}


/***/ }),

/***/ "./src/app/classes/Deck.ts":
/*!*********************************!*\
  !*** ./src/app/classes/Deck.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Deck: () => (/* binding */ Deck)
/* harmony export */ });
/* harmony import */ var _enums_Face__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/Face */ "./src/app/enums/Face.ts");
/* harmony import */ var _enums_Suits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/Suits */ "./src/app/enums/Suits.ts");
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Card */ "./src/app/classes/Card.ts");



class Deck {
    constructor() {
        this.cards = [];
        const suits = [_enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Hearts, _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Diamonds, _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Clubs, _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Spades]; // Use Suit enum
        const faces = [_enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Two, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Three, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Four, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Five, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Six, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Seven, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Eight, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Nine, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Ten, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Jack, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Queen, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.King, _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Ace]; // Use Face enum
        for (const suit of suits) {
            for (const face of faces) {
                this.cards.push(new _Card__WEBPACK_IMPORTED_MODULE_2__.Card(face, suit));
            }
        }
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    sort() {
        this.cards.sort((a, b) => {
            if (a.suit === b.suit) {
                return a.face - b.face;
            }
            return a.suit - b.suit;
        });
    }
}


/***/ }),

/***/ "./src/app/classes/Game.ts":
/*!*********************************!*\
  !*** ./src/app/classes/Game.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PassType: () => (/* binding */ PassType),
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _enums_Face__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/Face */ "./src/app/enums/Face.ts");
/* harmony import */ var _enums_Suits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/Suits */ "./src/app/enums/Suits.ts");
/* harmony import */ var _Deck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Deck */ "./src/app/classes/Deck.ts");
/* harmony import */ var _Round__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Round */ "./src/app/classes/Round.ts");




class Game {
    constructor(players) {
        this.isCardPassingComplete = false;
        this.players = players;
        this.deck = new _Deck__WEBPACK_IMPORTED_MODULE_2__.Deck();
        this.round = new _Round__WEBPACK_IMPORTED_MODULE_3__.Round();
        this.currentPassType = PassType.Left;
        this.roomId = '';
    }
    beginNewRound() {
        if (!this.round.isComplete && this.round.completedTricks.length > 0) {
            throw new Error(`Current round is not complete! ${13 - this.round.completedTricks.length} tricks remaining`);
        }
        this.deck = new _Deck__WEBPACK_IMPORTED_MODULE_2__.Deck();
        this.deck.shuffle();
        this.dealCards();
        this.round = new _Round__WEBPACK_IMPORTED_MODULE_3__.Round();
    }
    addTrickToWinningPlayer() {
        const winningCard = this.round.currentTrick.getWinningCard();
        const winningPlayer = this.players.find(player => player.id === winningCard.ownerId);
        winningPlayer.addTrickWon(this.round.currentTrick);
        winningPlayer.isTurn = true;
    }
    updateGame(card, playerId) {
        if (!this.isCardPassingComplete) {
            throw new Error("Cannot play until passing is complete!");
        }
        const player = this.players.find(p => p.id === playerId);
        if (!player.isTurn) {
            throw new Error("It's not your turn!");
        }
        this.round.addCardToTrick(card, player.hand);
        player.removeCard(card);
        player.isTurn = false;
        if (this.round.isTrickComplete()) {
            this.addTrickToWinningPlayer();
            this.round.moveToNextTrick();
        }
        else {
            const nextPlayerIndex = (this.players.indexOf(player) + 1) % this.players.length;
            this.players[nextPlayerIndex].isTurn = true;
        }
        return this;
    }
    dealCards() {
        this.players.forEach(player => player.reset());
        for (const [index, card] of this.deck.cards.entries()) {
            const player = this.players[index % this.players.length];
            player.addCard(card);
        }
    }
    completeRound() {
        if (!this.round.isComplete) {
            throw new Error("Round is not complete!");
        }
        //check for moon shooter, and update Totalpoints for players
        const playerShotTheMoon = this.players.find(player => player.checkForMoonShoot());
        if (playerShotTheMoon) {
            this.players.forEach(player => player.totalPoints += 26 + player.roundPoints);
            playerShotTheMoon.totalPoints -= 26;
        }
        else {
            this.players.forEach(player => player.totalPoints += player.roundPoints);
        }
        this.players.forEach(player => player.isTurn = false);
        this.updatePassType();
        this.isCardPassingComplete = false;
    }
    getMaskedGameStateString(playerId) {
        const copy = JSON.parse(JSON.stringify(this));
        copy.players.forEach(player => {
            if (player.id !== playerId) {
                player.hand = new Array(player.hand.length).fill({ face: null, suit: null });
            }
        });
        return JSON.stringify(copy);
    }
    updatePassType() {
        switch (this.currentPassType) {
            case PassType.Left:
                this.currentPassType = PassType.Right;
                break;
            case PassType.Right:
                this.currentPassType = PassType.Across;
                break;
            case PassType.Across:
                this.currentPassType = PassType.NoPass;
                break;
            case PassType.NoPass:
                this.currentPassType = PassType.Left;
                break;
        }
    }
    passCards(cards, playerId) {
        if (this.currentPassType === PassType.NoPass) {
            throw new Error("No cards to pass. Pass type is No Pass.");
        }
        else if (cards.length !== 3) {
            throw new Error("You must pass exactly 3 cards.");
        }
        const player = this.players.find(player => player.id === playerId);
        player.cardsPassed = cards;
        const playerToPassTo = this.getPlayerToPassTo(player);
        playerToPassTo.cardsReceived = player.cardsPassed;
    }
    completeCardPassing() {
        if (this.isCardPassingComplete) {
            throw new Error("Card passing is already complete!");
        }
        if (!this.canCompleteCardPassing()) {
            throw new Error("Not all players have passed cards!");
        }
        this.players.forEach(player => player.hand = player.hand.filter(card => {
            const passedCards = player.cardsPassed;
            for (const passedCard of passedCards) {
                if (card.face === passedCard.face && card.suit === passedCard.suit) {
                    return false;
                }
            }
            return true;
        }));
        this.players.forEach(player => player.hand.push(...player.cardsReceived));
        this.players.forEach(player => player.hand.map(card => card.ownerId = player.id));
        this.players.forEach(player => {
            player.cardsPassed = [];
            player.cardsReceived = [];
        });
        this.players.find(player => player.hand.some(card => card.face === _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Two && card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Clubs)).isTurn = true;
        this.isCardPassingComplete = true;
    }
    canCompleteCardPassing() {
        return this.players.every(player => player.cardsPassed.length === 3);
    }
    getWinnerOfGame() {
        if (this.players.some(player => player.totalPoints > 100)) {
            let winningPlayer = this.players[0];
            for (let i = 1; i < this.players.length; i++) {
                if (this.players[i].totalPoints < winningPlayer.totalPoints) {
                    winningPlayer = this.players[i];
                }
            }
            return winningPlayer;
        }
        return null;
    }
    getPlayerToPassTo(passingPlayer) {
        const playerIndex = this.players.findIndex(player => player.id === passingPlayer.id);
        switch (this.currentPassType) {
            case PassType.Left:
                return this.players[(playerIndex + 3) % this.players.length];
            case PassType.Right:
                return this.players[(playerIndex + 1) % this.players.length];
            case PassType.Across:
                return this.players[(playerIndex + 2) % this.players.length];
            default:
                throw new Error("Invalid pass type");
        }
    }
}
var PassType;
(function (PassType) {
    PassType["Left"] = "Left";
    PassType["Right"] = "Right";
    PassType["Across"] = "Across";
    PassType["NoPass"] = "No Pass";
})(PassType || (PassType = {}));


/***/ }),

/***/ "./src/app/classes/GamesManager.ts":
/*!*****************************************!*\
  !*** ./src/app/classes/GamesManager.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameManager)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/app/classes/Game.ts");
/* harmony import */ var _HttpError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpError */ "./src/app/classes/HttpError.ts");


class GameManager {
    constructor() {
        this.games = [];
    }
    createGame(players, roomId) {
        const game = new _Game__WEBPACK_IMPORTED_MODULE_0__["default"](players);
        game.roomId = roomId;
        this.games.push(game);
        return game;
    }
    getGame(playerId) {
        const game = this.games.find(game => game.players.some(player => player.id === playerId));
        if (!game) {
            throw new _HttpError__WEBPACK_IMPORTED_MODULE_1__["default"](`Game not found for player ${playerId}`, 400);
        }
        return game;
    }
    getGameByRoomId(roomId) {
        return this.games.find(game => game.roomId === roomId);
    }
    removeGame(roomId) {
        this.games = this.games.filter(game => game.roomId !== roomId);
    }
}


/***/ }),

/***/ "./src/app/classes/HttpError.ts":
/*!**************************************!*\
  !*** ./src/app/classes/HttpError.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HttpError)
/* harmony export */ });
class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = "HttpError";
        this.statusCode = statusCode;
    }
}


/***/ }),

/***/ "./src/app/classes/Message.ts":
/*!************************************!*\
  !*** ./src/app/classes/Message.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Severity: () => (/* binding */ Severity),
/* harmony export */   "default": () => (/* binding */ Message)
/* harmony export */ });
class Message {
    constructor(severity, content, event) {
        this.event = event;
        this.severity = severity;
        this.content = content;
    }
}
var Severity;
(function (Severity) {
    Severity["Info"] = "info";
    Severity["Error"] = "error";
    Severity["Success"] = "success";
    Severity["Warning"] = "warning";
})(Severity || (Severity = {}));


/***/ }),

/***/ "./src/app/classes/Player.ts":
/*!***********************************!*\
  !*** ./src/app/classes/Player.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _enums_Face__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/Face */ "./src/app/enums/Face.ts");
/* harmony import */ var _enums_Suits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/Suits */ "./src/app/enums/Suits.ts");


class Player {
    constructor(name, id) {
        this.cardsPassed = [];
        this.cardsReceived = [];
        this.name = name;
        this.hand = [];
        this.tricksWon = [];
        this.totalPoints = 0;
        this.roundPoints = 0;
        this.id = id;
        this.isTurn = false;
        this.isReadyForNextRound = false;
    }
    addCard(card) {
        card.addOwner(this.id);
        this.hand.push(card);
    }
    addTrickWon(trick) {
        this.tricksWon.push(trick);
        this.roundPoints = this.tricksWon.reduce((acc, trick) => acc + trick.points, 0);
    }
    removeCard(card) {
        const index = this.hand.findIndex(c => c.face === card.face && c.suit === card.suit && c.ownerId === this.id);
        if (index > -1) {
            this.hand.splice(index, 1);
            return true;
        }
        return false;
    }
    reset() {
        this.roundPoints = 0;
        this.hand = [];
        this.tricksWon = [];
        this.isTurn = false;
        this.isReadyForNextRound = false;
    }
    checkForMoonShoot() {
        const heartsCount = this.tricksWon.filter(trick => trick.cards.some(card => card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Hearts)).length;
        const queenOfSpadesCount = this.tricksWon.filter(trick => trick.cards.some(card => card.face === _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Queen && card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Spades)).length;
        return heartsCount === 13 && queenOfSpadesCount === 1;
    }
}


/***/ }),

/***/ "./src/app/classes/Round.ts":
/*!**********************************!*\
  !*** ./src/app/classes/Round.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Round: () => (/* binding */ Round)
/* harmony export */ });
/* harmony import */ var _enums_Face__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/Face */ "./src/app/enums/Face.ts");
/* harmony import */ var _enums_Suits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/Suits */ "./src/app/enums/Suits.ts");
/* harmony import */ var _Trick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Trick */ "./src/app/classes/Trick.ts");



class Round {
    constructor() {
        this.completedTricks = [];
        this.currentTrick = new _Trick__WEBPACK_IMPORTED_MODULE_2__.Trick();
        this.isComplete = false;
    }
    addCardToTrick(card, playerCardsInHand) {
        if (this.completedTricks.length === 0) {
            //logic for first trick of the round
            if (this.currentTrick.cards.length === 0 && !(card.face === _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Two && card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Clubs)) {
                throw new Error("You must play the Deuce of Clubs to start the round");
            }
            if (card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Hearts) {
                throw new Error("You cannot play hearts on the first trick");
            }
        }
        this.currentTrick.addCard(card, playerCardsInHand);
    }
    isTrickComplete() {
        return this.currentTrick.cards.length === 4;
    }
    moveToNextTrick() {
        this.completedTricks.push(this.currentTrick);
        this.isComplete = this.completedTricks.length === 13;
        this.currentTrick = new _Trick__WEBPACK_IMPORTED_MODULE_2__.Trick();
    }
}


/***/ }),

/***/ "./src/app/classes/SocketRoom.ts":
/*!***************************************!*\
  !*** ./src/app/classes/SocketRoom.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SocketRoom)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./src/app/classes/Player.ts");


class SocketRoom {
    constructor(roomName, roomPassword, initialPlayer) {
        this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
        this.players = [];
        this.players.push(initialPlayer);
        this.roomPassword = roomPassword;
        this.roomName = roomName;
    }
    addPlayer(playerName, socketId) {
        this.players.push(new _Player__WEBPACK_IMPORTED_MODULE_1__.Player(playerName, socketId));
    }
    hasPlayer(playerId) {
        return this.players.some(player => player.id === playerId);
    }
    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id !== playerId);
    }
}


/***/ }),

/***/ "./src/app/classes/Trick.ts":
/*!**********************************!*\
  !*** ./src/app/classes/Trick.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trick: () => (/* binding */ Trick)
/* harmony export */ });
/* harmony import */ var _enums_Face__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/Face */ "./src/app/enums/Face.ts");
/* harmony import */ var _enums_Suits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/Suits */ "./src/app/enums/Suits.ts");


class Trick {
    constructor() {
        this.cards = [];
        this.points = 0;
    }
    addCard(card, playerCardsInHand) {
        if (this.cards.length === 0) {
            this.trickSuit = card.suit;
        }
        if (this.cards.length > 0 &&
            card.suit !== this.trickSuit &&
            playerCardsInHand.some(c => c.suit === this.trickSuit)) {
            throw new Error("You must follow the trick suit");
        }
        this.cards.push(card);
        this.updatePoints();
    }
    getWinningCard() {
        if (this.cards.length < 4) {
            throw new Error("Not enough cards to determine a winner");
        }
        let winningCard = this.cards[0];
        for (const card of this.cards) {
            if (card.face > winningCard.face && card.suit === this.trickSuit) {
                winningCard = card;
            }
        }
        return winningCard;
    }
    updatePoints() {
        let points = 0;
        for (const card of this.cards) {
            if (card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Hearts) {
                points += 1;
            }
            else if (card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Spades && card.face === _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Queen) {
                points += 13;
            }
            else if (card.suit === _enums_Suits__WEBPACK_IMPORTED_MODULE_1__.Suit.Diamonds && card.face === _enums_Face__WEBPACK_IMPORTED_MODULE_0__.Face.Jack) {
                points -= 10;
            }
        }
        this.points = points;
    }
}


/***/ }),

/***/ "./src/app/enums/Face.ts":
/*!*******************************!*\
  !*** ./src/app/enums/Face.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Face: () => (/* binding */ Face)
/* harmony export */ });
var Face;
(function (Face) {
    Face[Face["Two"] = 2] = "Two";
    Face[Face["Three"] = 3] = "Three";
    Face[Face["Four"] = 4] = "Four";
    Face[Face["Five"] = 5] = "Five";
    Face[Face["Six"] = 6] = "Six";
    Face[Face["Seven"] = 7] = "Seven";
    Face[Face["Eight"] = 8] = "Eight";
    Face[Face["Nine"] = 9] = "Nine";
    Face[Face["Ten"] = 10] = "Ten";
    Face[Face["Jack"] = 11] = "Jack";
    Face[Face["Queen"] = 12] = "Queen";
    Face[Face["King"] = 13] = "King";
    Face[Face["Ace"] = 14] = "Ace";
})(Face || (Face = {}));


/***/ }),

/***/ "./src/app/enums/Suits.ts":
/*!********************************!*\
  !*** ./src/app/enums/Suits.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Suit: () => (/* binding */ Suit)
/* harmony export */ });
var Suit;
(function (Suit) {
    Suit[Suit["Hearts"] = 0] = "Hearts";
    Suit[Suit["Diamonds"] = 1] = "Diamonds";
    Suit[Suit["Clubs"] = 2] = "Clubs";
    Suit[Suit["Spades"] = 3] = "Spades";
})(Suit || (Suit = {}));


/***/ }),

/***/ "./src/app/events/Events.ts":
/*!**********************************!*\
  !*** ./src/app/events/Events.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventsCallbacks: () => (/* binding */ EventsCallbacks),
/* harmony export */   SocketEvent: () => (/* binding */ SocketEvent)
/* harmony export */ });
var SocketEvent;
(function (SocketEvent) {
    SocketEvent["Message"] = "message";
    SocketEvent["JoinRoom"] = "join-room";
    SocketEvent["GetRooms"] = "get-rooms";
    SocketEvent["CreateRoom"] = "create-room";
    SocketEvent["UpdateGame"] = "update-game";
    SocketEvent["RoundCompleted"] = "round-complete";
    SocketEvent["CardPass"] = "card-pass";
})(SocketEvent || (SocketEvent = {}));
const EventsCallbacks = {
    message: (message) => {
        console.log(`Message from server: ${message}`);
    },
    joinRoom: (room) => {
        console.log('Joined room:', room);
        return room;
    }
};


/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "next":
/*!***********************!*\
  !*** external "next" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("next");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next */ "next");
/* harmony import */ var next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io */ "socket.io");
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_app_classes_GamesManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/app/classes/GamesManager */ "./src/app/classes/GamesManager.ts");
/* harmony import */ var _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/app/classes/Message */ "./src/app/classes/Message.ts");
/* harmony import */ var _src_app_classes_Player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/app/classes/Player */ "./src/app/classes/Player.ts");
/* harmony import */ var _src_app_classes_SocketRoom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/app/classes/SocketRoom */ "./src/app/classes/SocketRoom.ts");
/* harmony import */ var _src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/app/events/Events */ "./src/app/events/Events.ts");
var _a;









const hostname = (_a = process.env.hostname) !== null && _a !== void 0 ? _a : "localhost";
const portFromEnv = process.env.port ? +process.env.port : null;
const port = portFromEnv !== null && portFromEnv !== void 0 ? portFromEnv : 3000;
const app = next__WEBPACK_IMPORTED_MODULE_1___default()({ dev: "development" !== 'production', hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = (0,http__WEBPACK_IMPORTED_MODULE_0__.createServer)((req, res) => {
        var _a;
        const parsedUrl = (0,url__WEBPACK_IMPORTED_MODULE_3__.parse)((_a = req.url) !== null && _a !== void 0 ? _a : '', true);
        handle(req, res, parsedUrl);
    });
    const io = new socket_io__WEBPACK_IMPORTED_MODULE_2__.Server(server);
    const gameManager = new _src_app_classes_GamesManager__WEBPACK_IMPORTED_MODULE_4__["default"]();
    const rooms = [];
    io.on('connection', socket => {
        console.log('Client connected total clients:', io.engine.clientsCount);
        socket.on('disconnect', () => {
            var _a;
            const roomPlayerWasIn = rooms.find(room => room.hasPlayer(socket.id));
            if (!roomPlayerWasIn)
                return;
            roomPlayerWasIn.removePlayer(socket.id);
            console.log('Client disconnected');
            io.to(roomPlayerWasIn.roomName).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Info, `${(_a = roomPlayerWasIn.players.find(player => player.id === socket.id)) === null || _a === void 0 ? void 0 : _a.name}} has left the room ${roomPlayerWasIn.roomName}`));
            io.to(roomPlayerWasIn.roomName).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.UpdateGame, null);
            io.to(roomPlayerWasIn.roomName).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, `Game has ended as player left`));
            gameManager.removeGame(roomPlayerWasIn.id);
            rooms.splice(rooms.indexOf(roomPlayerWasIn), 1);
            socket.leave(roomPlayerWasIn.roomName);
        });
        socket.on(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.JoinRoom, (roomName, password, playerName) => {
            const room = rooms.find(room => room.roomName === roomName);
            if (!room) {
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, `Room ${roomName} does not exist`));
                return;
            }
            else if (room.roomPassword !== password) {
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, `Password for room ${roomName} is incorrect`));
                return;
            }
            else if (room.players.length == 4) {
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, `Room ${roomName} is full`));
                return;
            }
            else if (room.players.some(player => player.id === socket.id)) {
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, `You are already in room ${roomName}`));
                return;
            }
            else if (room.players.some(player => player.name.toLocaleLowerCase() === playerName.toLocaleLowerCase())) {
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, `Player ${playerName} is already taken in ${roomName}`));
                return;
            }
            else if (gameManager.getGameByRoomId(room.id)) {
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, `Game already started`));
                return;
            }
            socket.join(room.roomName);
            room.addPlayer(playerName, socket.id);
            io.to(room.roomName).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Info, `A new player ${playerName} has joined the room ${room.roomName}`)); // Notify other players in the room
            socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Success, `You have joined the room: ${room.roomName}`, _src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.JoinRoom));
            io.to(room.roomName).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.JoinRoom, room);
            if (room.players.length === 4) {
                // Start the game when the room is full
                const game = gameManager.createGame(room.players, room.id);
                //start game as round complete
                game.round.isComplete = true;
                console.log('Starting game for room', room.roomName, 'with players', room.players);
                sendMaskedGameToClients(game);
            }
        });
        socket.on(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.CreateRoom, (roomName, password, playerName) => {
            const newRoom = new _src_app_classes_SocketRoom__WEBPACK_IMPORTED_MODULE_7__["default"](roomName, password, new _src_app_classes_Player__WEBPACK_IMPORTED_MODULE_6__.Player(playerName, socket.id));
            if (rooms.some(room => room.roomName === newRoom.roomName)) {
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, "Room already Exists. Please choose another name"));
                return;
            }
            socket.join(newRoom.roomName);
            rooms.push(newRoom);
            socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Success, `You have created the room: ${newRoom.roomName}`, _src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.CreateRoom));
            socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.JoinRoom, newRoom);
            //clients will get updatedList of rooms every time new one is added
            socket.broadcast.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.GetRooms, rooms);
        });
        socket.on(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.GetRooms, () => {
            socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.GetRooms, rooms);
        });
        socket.on(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.UpdateGame, (cardPlayed) => {
            const game = gameManager.getGame(socket.id);
            const room = rooms.find(room => room.hasPlayer(socket.id));
            try {
                game.updateGame(cardPlayed, socket.id);
                sendMaskedGameToClients(game);
                if (game.round.isComplete) {
                    game.completeRound();
                    const winner = game.getWinnerOfGame();
                    if (winner) {
                        io.to(room.roomName).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Success, `${winner.name} has won the game!`));
                        gameManager.removeGame(game.roomId);
                        rooms.splice(rooms.indexOf(room), 1);
                        socket.leave(room.roomName);
                        return;
                    }
                }
                if (!game.round.isComplete) {
                    const nextPlayer = game.players.find(player => player.isTurn);
                    io.to(nextPlayer.id).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Info, `It's your turn!`));
                }
            }
            catch (e) {
                const error = e;
                console.log('Error updating game', e);
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, error.message));
            }
        });
        socket.on(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.RoundCompleted, () => {
            const game = gameManager.getGame(socket.id);
            const roomName = rooms.find(room => room.hasPlayer(socket.id)).roomName;
            const player = game.players.find(player => player.id === socket.id);
            player.isReadyForNextRound = !player.isReadyForNextRound;
            io.to(roomName).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.UpdateGame, JSON.stringify(game));
            if (game.players.every(player => player.isReadyForNextRound)) {
                game.beginNewRound();
                sendMaskedGameToClients(game);
                const nextPlayer = game.players.find(player => player.isTurn);
                io.to(nextPlayer.id).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Info, `It's your turn!`));
            }
        });
        socket.on(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.CardPass, (passedCards) => {
            try {
                const game = gameManager.getGame(socket.id);
                if (game.isCardPassingComplete) {
                    socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, "Card passing is already complete"));
                    return;
                }
                const player = game.players.find(player => player.id === socket.id);
                game.passCards(passedCards, player.id);
                if (game.canCompleteCardPassing()) {
                    game.completeCardPassing();
                }
                sendMaskedGameToClients(game);
            }
            catch (e) {
                const error = e;
                console.log('Error passing cards', e);
                socket.emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.Message, new _src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__["default"](_src_app_classes_Message__WEBPACK_IMPORTED_MODULE_5__.Severity.Error, error.message));
            }
        });
        function sendMaskedGameToClients(game) {
            for (const player of game.players) {
                io.to(player.id).emit(_src_app_events_Events__WEBPACK_IMPORTED_MODULE_8__.SocketEvent.UpdateGame, game.getMaskedGameStateString(player.id));
            }
        }
    });
    server.listen(port, () => {
        console.log('> Ready on http://localhost:3000');
    });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map