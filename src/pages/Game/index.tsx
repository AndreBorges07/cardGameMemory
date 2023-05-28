import React, { useState, useEffect } from 'react';
import './style.css';

const Game = () => {
  const [cards, setCards] = useState([
    { id: 1, value: 'A', flipped: false, matched: false },
    { id: 2, value: 'A', flipped: false, matched: false },
    { id: 3, value: 'B', flipped: false, matched: false },
    { id: 4, value: 'B', flipped: false, matched: false },
  ]);

  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    checkGameOver();
  }, [cards]);

  const checkGameOver = () => {
    const allMatched = cards.every((card) => card.matched);
    setGameOver(allMatched);
  };

  const handleClick = (id) => {
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );

    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      const matched = cards.find((card) => card.id === flippedCards[0]).value;

      if (matched === newCards.find((card) => card.id === id).value) {
        setCards(
          newCards.map((card) =>
            card.value === matched ? { ...card, matched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(
            newCards.map((card) =>
              card.id === id || card.id === flippedCards[0]
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards(cards.map((card) => ({ ...card, flipped: false, matched: false })));
    setFlippedCards([]);
    setGameOver(false);
  };

  return (
    <div className="game">
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''} ${
              card.matched ? 'matched' : ''
            }`}
            onClick={() => !card.flipped && !gameOver && handleClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        
      </div>
      {gameOver && (
        <div className="message">
          <button onClick={handleRestart}>Jogar novamente</button>
        </div>
      )}
    </div>
  );
};

export default Game;
