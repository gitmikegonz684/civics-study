export interface Card {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
}

export type CardStatus = 'new' | 'learned' | 'repeat';