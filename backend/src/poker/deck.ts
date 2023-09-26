import crypto from 'crypto';
import { Card, Suit, Rank } from './card';

/**
 * Deck class represents a standard deck of playing cards.
 * It provides methods for shuffling the deck, drawing cards,
 * dealing hands, and other typical deck operations.
 * 
 * Shuffling is cryptographically secure.
 */
export class Deck {
  // Internal array to hold card objects.
  private cards: Card[] = [];

  /**
   * Constructor initializes and shuffles a new deck of cards.
   */
  constructor() {
    this.init();
    this.shuffle();
  }

  /**
   * Initializes the deck with a standard set of 52 playing cards.
   */
  private init(): void {
    this.cards = [];
    for (const suit in Suit) {
      for (const rank in Rank) {
        // Type assertion is used for enum iteration.
        this.cards.push(new Card(Suit[suit as keyof typeof Suit], Rank[rank as keyof typeof Rank]));
      }
    }
  }

  /**
   * Shuffles the deck using a cryptographically secure algorithm.
   * Uses the Fisher-Yates (Knuth) shuffle algorithm.
   */
  shuffle(): void {
    // Pre-allocate a large enough buffer of random bytes.
    // The buffer is oversized to account for potential re-rolls due to modulo bias.
    const buf = crypto.randomBytes(4 * this.cards.length * 2);
    let offset = 0;

    for (let i = this.cards.length - 1; i > 0; --i) {
      let rand = buf.readUInt32BE(offset);

      // Eliminate modulo bias by re-rolling if necessary.
      while (rand >= (0xFFFFFFFF - (0xFFFFFFFF % (i + 1)))) {
        offset += 4;
        rand = buf.readUInt32BE(offset);
      }

      // Calculate a random index to swap with.
      const j = rand % (i + 1);

      // Perform the swap.
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];

      // Increment the offset for the next iteration.
      offset += 4;
    }
  }

  /**
   * Draws a single card from the deck.
   * Throws an error if the deck is empty.
   * @returns {Card} The drawn card.
   */
  drawCard(): Card {
    if (this.cards.length === 0) {
      throw new Error("Can't draw cards from an empty deck!");
    }
    return this.cards.pop();
  }

  /**
   * Draws three community cards, usually for the "flop" in Texas Hold 'Em.
   * @returns {Card[]} An array of drawn community cards.
   */
  drawCommunityCards(): Card[] {
    return [this.drawCard(), this.drawCard(), this.drawCard()];
  }

  /**
   * Deals a hand consisting of two cards.
   * @returns {Card[]} An array of two drawn cards.
   */
  dealHand(): Card[] {
    return [this.drawCard(), this.drawCard()];
  }

  /**
   * Returns the number of remaining cards in the deck.
   * @returns {number} The number of remaining cards.
   */
  remainingCards(): number {
    return this.cards.length;
  }
}
