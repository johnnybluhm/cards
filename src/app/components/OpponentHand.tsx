import '../card-styles/cards.css';

type Props = {
    numberOfCards: number;
    shouldBeVertical?: boolean; // Rotate the hand for display purposes
}

export default function OpponentHand({ numberOfCards, shouldBeVertical = false }: Readonly<Props>) {
    const cards = new Array(numberOfCards).fill(null);
    return (
        <>
            {shouldBeVertical ? <ul className="hand" style={{ width: `${13 * 2 + 4}em` }}>
                {
                    cards.map((card, cardIndex) => (
                        <li key={cardIndex}>
                            <span className="card back" />
                        </li>
                    ))
                }
            </ul>
                :
                <ul className="hand">
                    {cards.map((card, cardIndex) => (
                        <li key={cardIndex}>
                            <span className="card back" />
                        </li>
                    ))}
                </ul>}
        </>
    );
};