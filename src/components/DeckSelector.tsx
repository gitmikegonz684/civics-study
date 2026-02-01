import React from 'react';
import type { Deck } from '../types';

interface DeckSelectorProps {
  decks: Deck[];
  onSelectDeck: (deck: Deck) => void;
  onViewLearned: () => void;
}

const DeckSelector: React.FC<DeckSelectorProps> = ({ decks, onSelectDeck, onViewLearned }) => {
  return (
    <div className="deck-selector">
      <h1>Study Decks</h1>
      <div className="deck-list">
        {decks.map(deck => (
          <button key={deck.id} onClick={() => onSelectDeck(deck)} className="deck-button">
            {deck.name}
          </button>
        ))}
      </div>
      <button onClick={onViewLearned} className="view-learned-btn">View Learned Cards</button>
    </div>
  );
};

export default DeckSelector;