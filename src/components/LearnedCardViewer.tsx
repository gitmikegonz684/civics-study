import React, { useState, useEffect } from 'react';
import type { Deck, Card } from '../types';

interface LearnedCardViewerProps {
  deck: Deck;
  onBack: () => void;
}

const LearnedCardViewer: React.FC<LearnedCardViewerProps> = ({ deck, onBack }) => {
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Load learned cards
    const stored = localStorage.getItem(`learned-${deck.id}`);
    const learnedIds = stored ? JSON.parse(stored) as string[] : [];
    const learnedCards = deck.cards.filter(card => learnedIds.includes(card.id));
    const shuffled = [...learnedCards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  }, [deck]);

  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === 's' && !showAnswer) {
          e.preventDefault();
          handleShowAnswer();
        }
        if (e.key.toLowerCase() === 'n' && showAnswer) {
          e.preventDefault();
          nextCard();
        }
        if (e.key.toLowerCase() === 'b') {
          e.preventDefault();
          onBack();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showAnswer]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const nextCard = () => {
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // All viewed
      onBack();
    }
  };

  if (currentCards.length === 0) {
    return (
      <div className="flashcard-viewer">
        <h2>No learned cards in this deck.</h2>
        <button onClick={onBack} className="back-btn">Back to Learned Decks</button>
      </div>
    );
  }

  const currentCard = currentCards[currentIndex];

  return (
    <div className="flashcard-viewer">
      <h2>{deck.name}</h2>
      <div className="progress">
        Learned Card {currentIndex + 1} of {currentCards.length}
      </div>
      <div className="flashcard">
        <div className="card-content">
          <div className="question">{currentCard.question}</div>
          {showAnswer && (
            <div className="answer">{currentCard.answer}</div>
          )}
        </div>
      </div>
      <div className="buttons">
        {!showAnswer ? (
          <button onClick={handleShowAnswer} className="show-answer-btn">Show Answer</button>
        ) : (
          <button onClick={nextCard} className="next-btn">Next Card</button>
        )}
      </div>
      <button onClick={onBack} className="back-btn">Back to Learned Decks</button>
    </div>
  );
};

export default LearnedCardViewer;