import '../card-styles/cards.css';
import { Trick as CardTrick } from '../classes/Trick';
import PlayingCard from './CardComponent';

type Props = {
    trick?: CardTrick;
}

export default function Trick({ trick }: Readonly<Props>) {
    return (
        <ul className="hand" style={{marginRight:'8em'}}>
            {trick?.cards.map((card, cardIndex) => (
                <li key={cardIndex}>
                    <PlayingCard card={card} updateGame={() => { }} />
                </li>

            ))}
        </ul>
    );
};