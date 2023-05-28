import React, { useState, useEffect } from 'react';
import './style.css';

const Game = () => {
  const initialCards = [
    { id: 1, value: 'ANGULAR', flipped: false, matched: false },
    { id: 2, value: 'ANGULAR', flipped: false, matched: false },
    { id: 3, value: 'REACT', flipped: false, matched: false },
    { id: 4, value: 'REACT', flipped: false, matched: false },
    { id: 5, value: 'VUE', flipped: false, matched: false },
    { id: 6, value: 'VUE', flipped: false, matched: false },
    { id: 7, value: 'JAVASCRIPT', flipped: false, matched: false },
    { id: 8, value: 'JAVASCRIPT', flipped: false, matched: false },
    { id: 9, value: 'PYTHON', flipped: false, matched: false },
    { id: 10, value: 'PYTHON', flipped: false, matched: false },
  ];

  const [cards, setCards] = useState(shuffle(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const handleRefresh = () => {
    window.location.reload();
  };

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
        setScore(score + 5);
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
          setScore(score > 0 ? score - 2 : 0);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards(shuffle(initialCards.map((card) => ({ ...card, flipped: false, matched: false }))));
    setFlippedCards([]);
    setGameOver(false);
    setScore(0);
  };

  function shuffle(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

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
      {gameOver ? (
        <div className="message">
        <div className="score">Pontos: {score}</div>
          {/* <button onClick={handleRestart}>Jogar novamente</button> */}
          
        </div>
        
      ) : (
        <div className="message">
            <div className="score">Pontos: {score}             </div>
            <button onClick={handleRefresh}>Voltar</button>
        </div>
        
      )}

    {/* <div>
      <button onClick={handleRefresh}>Voltar</button>
    </div> */}
      
    </div>

    
  );
};

export default Game;
