import React, { useState, useEffect } from 'react';
import type { Deck, Card } from '../types';

interface FlashcardViewerProps {
  deck: Deck;
  onBack: () => void;
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ deck, onBack }) => {
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learnedCards, setLearnedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load learned cards from localStorage
    const stored = localStorage.getItem(`learned-${deck.id}`);
    const learned = stored ? new Set(JSON.parse(stored) as string[]) : new Set<string>();
    setLearnedCards(learned);

    // Filter out learned cards and shuffle
    const availableCards = deck.cards.filter(card => !learned.has(card.id));
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
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
      if (e.key.toLowerCase() === 'l' && showAnswer) {
        e.preventDefault();
        handleLearned();
      }
      if (e.key.toLowerCase() === 'r' && showAnswer) {
        e.preventDefault();
        handleRepeat();
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

  const handleLearned = () => {
    const card = currentCards[currentIndex];
    const newLearned = new Set(learnedCards);
    newLearned.add(card.id);
    setLearnedCards(newLearned);
    localStorage.setItem(`learned-${deck.id}`, JSON.stringify([...newLearned]));

    nextCard();
  };

  const handleRepeat = () => {
    const card = currentCards[currentIndex];
    const newCards = [...currentCards];
    newCards.push(card); // Add to end
    setCurrentCards(newCards);

    nextCard();
  };

  const handleReset = () => {
    const newLearned = new Set<string>();
    setLearnedCards(newLearned);
    localStorage.setItem(`learned-${deck.id}`, JSON.stringify([...newLearned]));

    // Reload cards
    const availableCards = deck.cards.filter(card => !newLearned.has(card.id));
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Session complete
      onBack();
    }
  };

  if (currentCards.length === 0) {
    return (
      <div className="flashcard-viewer">
        <h2>All cards in this deck are learned!</h2>
        <button onClick={onBack} className="back-btn">Back to Decks</button>
        <button onClick={handleReset} className="clear-btn">Reset Deck</button>
      </div>
    );
  }

  const currentCard = currentCards[currentIndex];

  return (
    <div className="flashcard-viewer">
        <h2>{deck.name}</h2>
      <div className="progress">
        Card {currentIndex + 1} of {currentCards.length}
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
          <>
            <button onClick={handleLearned} className="learned-btn">Learned</button>
            <button onClick={handleRepeat} className="repeat-btn">Repeat</button>
            <button onClick={nextCard} className="next-btn">Next Card</button>
          </>
        )}
      </div>
      <button onClick={onBack} className="back-btn">Back to Decks</button>
    </div>
  );
};

export default FlashcardViewer;