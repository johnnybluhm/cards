import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import PlayingCard from './CardComponent';

type Props = {
    cards: CardModel[];
    updateGame: (cardPlayed: CardModel) => void;
}

export default function Hand({ cards, updateGame }: Readonly<Props>) {
    sortHand(cards);
    return (
        <ul className="hand">
            {cards.map((card, cardIndex) => (
                <li key={`${cardIndex}-${card.ownerId}`}>
                    <PlayingCard card={card} updateGame={updateGame} />
                </li>
            ))
            }
        </ul >
    );
};

function sortHand(cards: CardModel[]) {
    cards.sort((a, b) => {
        if (a.suit === b.suit) {
            return a.face - b.face;
        }
        return a.suit - b.suit;
    });
}