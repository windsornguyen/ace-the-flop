import { Deck } from './deck';
import { Table } from './table';
import { Player } from './player';
import { HandEvaluator } from './hand-evaluator';

export class GameEngine {
  private deck: Deck;
  private table: Table;

  constructor(players: Player[]) {
    this.deck = new Deck();
    this.table = new Table('1', players);
  }

  startRound() {
    // Shuffle deck, deal hands, etc.
  }

  // ... more methods for running the game
}
