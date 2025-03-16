import '../card-styles/cards.css';

type Props = {
    numberOfCards: number
}

export default function OpponentHand({ numberOfCards }: Readonly<Props>) {
    const cards = new Array(numberOfCards).fill(null);
    return (
        <ul className="hand">
            {cards.map((card, cardIndex) => (
                <li key={cardIndex}>
                    <span className="card back" />
                </li>

            ))}
        </ul>
    );
};