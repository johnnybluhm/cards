import '../card-styles/cards.css';
import { Card } from '../classes/Card';
import { Trick as CardTrick } from '../classes/Trick';
import PlayingCard from './CardComponent';

type Props = {
    trick?: CardTrick;
    updateGame: (cardPlayed: Card) => void;
}

export default function Trick({ trick, updateGame }: Readonly<Props>) {
    return (
        <ul className="hand">
            {trick?.cards.map((card, cardIndex) => (
                <li key={cardIndex}>
                    <PlayingCard card={card} updateGame={updateGame} />
                </li>

            ))}
        </ul>
    );
};