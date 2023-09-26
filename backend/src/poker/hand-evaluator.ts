import { Card, Rank, Suit } from './card';


// TODO: The current code is wrong. We need:
// 1. Incorrect Counting Logic
// In isFourOfAKind, isThreeOfAKind, isOnePair, and isTwoPair, your bit-shifting logic incorrectly counts the ranks. These methods should count the occurrences of each rank rather than checking if a particular rank bit is set.

// 2. Misleading Method Names
// Methods like isOnePair and isTwoPair are misleading. A poker hand can have a pair and still be a full house. These methods should accurately reflect what they're checking—for example, checking for exactly one pair, not just the presence of a pair.

// 3. Incomplete Hand Evaluation
// The evaluateHand method assumes that the hand has already been pruned to the best 5-card combination. It's unclear how this happens, and the bestHand method is a placeholder. This part is crucial for correct evaluation.

// 4. Type Definitions
// The suitCounts type is implicitly defined. Explicitly define its type for better readability and type safety.


/**
 * HandEvaluator class is responsible for evaluating the strength of poker hands.
 * 
 * Given a poker hand (an array of Cards), HandEvaluator can determine the type of hand
 * (e.g., straight flush, four of a kind, etc.) and the cards that contribute to it.
 */
export class HandEvaluator {
    static suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades];
    static ranks = [Rank.Two, Rank.Three, Rank.Four, Rank.Five, 
                    Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, 
                    Rank.Ten, Rank.Jack, Rank.Queen, Rank.King, Rank.Ace];
    
  static isFlush(suitCounts: Record<string, number>): boolean {
    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) return true;
    }
    return false;
  }

  static isRoyalFlush(rankBits: number, suitCounts: Record<string, number>): boolean {
    return this.isFlush(suitCounts) && ((rankBits >> 8) & 0b11111) === 0b11111;
  }

  static isStraightFlush(rankBits: number, suitCounts: Record<string, number>): boolean {
    return this.isFlush(suitCounts) && this.isStraight(rankBits);
  }

  static isFourOfAKind(rankBits: number): boolean {
    let count = 0;
    for (let i = 0; i < 13; i++) {
      if ((rankBits >> i) & 1) count++;
      if (count === 4) return true;
    }
    return false;
  }

  static isFullHouse(rankBits: number): boolean {
    return this.isThreeOfAKind(rankBits) && this.isOnePair(rankBits);
  }

  static isStraight(rankBits: number): boolean {
    // Add lower ace for straight evaluation
    if ((rankBits >> 12) & 1) rankBits |= 1;

    for (let i = 0; i <= 8; i++) {
      if (((rankBits >> i) & 0b11111) === 0b11111) return true;

    }
    return false;
  }

  static isThreeOfAKind(rankBits: number): boolean {
    let count = 0;
    for (let i = 0; i < 13; i++) {
      if ((rankBits >> i) & 1) count++;
      if (count === 3) return true;
    }
    return false;
  }

  static isTwoPair(rankBits: number): boolean {
    let pairs = 0;
    for (let i = 0; i < 13; i++) {
      if ((rankBits >> i) & 1) pairs++;
      if (pairs === 2) return true;
    }
    return false;
  }

  static isOnePair(rankBits: number): boolean {
    let pairs = 0;
    for (let i = 0; i < 13; i++) {
      if ((rankBits >> i) & 1) pairs++;
      if (pairs === 1) return true;
    }
    return false;
  }
  
  /**
   * Evaluates a hand of cards and returns the type of hand it forms.
   * 
   * @param hand - An array of Cards representing the player's hand.
   * @returns {string} A string describing the hand type.
   */
  static evaluateHand(hand: Card[]): string {
    let rankBits = 0;
    let suitCounts = {Hearts: 0, Diamonds: 0, Clubs: 0, Spades: 0};

    // Convert the hand to bit representation.
    for (const card of hand) {
      rankBits |= 1 << this.ranks.indexOf(card.rank);
      suitCounts[card.suit]++;
    }

    // Check for hand types, starting from the strongest.
    if (this.isRoyalFlush(rankBits, suitCounts)) return "Royal Flush";
    if (this.isStraightFlush(rankBits, suitCounts)) return "Straight Flush";
    if (this.isFourOfAKind(rankBits)) return "Four of a Kind";
    if (this.isFullHouse(rankBits)) return "Full House";
    if (this.isFlush(suitCounts)) return "Flush";
    if (this.isStraight(rankBits)) return "Straight";
    if (this.isThreeOfAKind(rankBits)) return "Three of a Kind";
    if (this.isTwoPair(rankBits)) return "Two Pair";
    if (this.isOnePair(rankBits)) return "One Pair";
    return "High Card";

  }

  /**
   * [Optional] Compares two hands to determine the winner.
   * 
   * @param hand1 - The first hand.
   * @param hand2 - The second hand.
   * @returns {number} -1 if hand1 wins, 1 if hand2 wins, 0 if it's a tie.
   */
  static compareHands(hand1: Card[], hand2: Card[]): number {
    // Placeholder logic; replace with actual comparison logic.
    return 0;
  }

  /**
   * [Optional] Evaluates and returns the best possible hand from a set of cards.
   * 
   * @param cards - A set of cards to evaluate. This could be a combination of hole cards and community cards.
   * @returns {Card[]} The best possible hand.
   */
  static bestHand(cards: Card[]): Card[] {
    // Placeholder logic; replace with actual best-hand-finding logic.
    return [];
  }

  // You can add additional helper methods to break down the evaluation logic into manageable pieces.
}
