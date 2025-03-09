import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import PlayingCard from './CardComponent';

type Props = {
    cards: CardModel[];
    faceDown?: boolean;
}

export default function Hand({ cards, faceDown = false }: Readonly<Props>) {
    sortHand(cards);
    return (
        <ul className="hand">
            {cards.map((card, cardIndex) => (
                <li key={cardIndex}>
                    {faceDown ? <span className="card back" /> : <PlayingCard card={card} />}
                </li>

            ))}
        </ul>
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