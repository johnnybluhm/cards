import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import PlayingCard from './CardComponent';

type Props = {
    cards: CardModel[];
}

export default function Hand({ cards }: Readonly<Props>) {
    return (
        <ul className="hand">
            {cards.map((card, cardIndex) => (
                < li key={cardIndex}>
                    <PlayingCard card={card} />
                </li>

            ))}
        </ul>
    );
};