import { useState } from 'react';
import type { Deck } from './types';
import { decks } from './data';
import DeckSelector from './components/DeckSelector';
import FlashcardViewer from './components/FlashcardViewer';
import LearnedDeckSelector from './components/LearnedDeckSelector';
import LearnedCardViewer from './components/LearnedCardViewer';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'select' | 'study' | 'learned-select' | 'learned-view'>('select');
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'select':
        return (
          <DeckSelector
            decks={decks}
            onSelectDeck={(deck) => {
              setSelectedDeck(deck);
              setCurrentView('study');
            }}
            onViewLearned={() => setCurrentView('learned-select')}
          />
        );
      case 'study':
        return (
          <FlashcardViewer
            deck={selectedDeck!}
            onBack={() => {
              setCurrentView('select');
              setSelectedDeck(null);
            }}
          />
        );
      case 'learned-select':
        return (
          <LearnedDeckSelector
            decks={decks}
            onSelectDeck={(deck) => {
              setSelectedDeck(deck);
              setCurrentView('learned-view');
            }}
            onBack={() => setCurrentView('select')}
          />
        );
      case 'learned-view':
        return (
          <LearnedCardViewer
            deck={selectedDeck!}
            onBack={() => {
              setCurrentView('learned-select');
              setSelectedDeck(null);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderView()}
    </div>
  );
}

export default App;
