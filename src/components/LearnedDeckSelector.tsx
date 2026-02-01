import React, { useState } from 'react';
import type { Deck } from '../types';

interface LearnedDeckSelectorProps {
  decks: Deck[];
  onSelectDeck: (deck: Deck) => void;
  onBack: () => void;
}

const LearnedDeckSelector: React.FC<LearnedDeckSelectorProps> = ({ decks, onSelectDeck, onBack }) => {
  const [refresh, setRefresh] = useState(0);

  const learnedDecks = decks.filter(deck => {
    const stored = localStorage.getItem(`learned-${deck.id}`);
    return stored && JSON.parse(stored).length > 0;
  });

  const handleClear = (deckId: string) => {
    localStorage.setItem(`learned-${deckId}`, JSON.stringify([]));
    setRefresh(refresh + 1);
  };

  return (
    <div className="deck-selector">
      <h1>Learned Cards</h1>
      {learnedDecks.length === 0 ? (
        <p>No decks with learned cards yet.</p>
      ) : (
        <div className="deck-list">
          {learnedDecks.map(deck => {
            const stored = localStorage.getItem(`learned-${deck.id}`);
            const learnedCount = stored ? JSON.parse(stored).length : 0;
            const totalCount = deck.cards.length;
            return (
              <div key={deck.id} className="deck-item">
                <button onClick={() => onSelectDeck(deck)} className="learned-deck-button">
                  {deck.name}
                </button>
                <span className="counter">{learnedCount}/{totalCount}</span>
                <button onClick={() => handleClear(deck.id)} className="clear-btn">Clear</button>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={onBack} className="back-btn">Back to Main</button>
    </div>
  );
};

export default LearnedDeckSelector;