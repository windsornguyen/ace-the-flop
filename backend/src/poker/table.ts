import { Player } from './player';
import { Card } from './card';

/**
 * Table class represents the poker table.
 * 
 * Manages the state of the game, including players, community cards, and the pot.
 */
export class Table {
  /**
   * Constructs a new Table object.
   * 
   * @param id - Unique identifier for the table.
   * @param players - An array of Player objects at the table.
   * @param communityCards - An array of community cards on the table.
   * @param pot - The current size of the pot.
   */
  constructor(
    public id: string,
    public players: Player[] = [],
    public communityCards: Card[] = [],
    public pot: number = 0
  ) {
    if (pot < 0) 
        throw new Error("Initial pot size must be non-negative.");
  }

  /**
   * Adds a specified amount to the pot.
   * 
   * @param amount - The amount to add.
   */
  addToPot(amount: number): void {
    if (amount <= 0 || !Number.isInteger(amount)) 
        throw new Error("Amount to add to pot must be a positive integer.");
    this.pot += amount;
  }

  /**
   * Removes a specified amount from the pot, typically when distributing winnings.
   * 
   * @param amount - The amount to remove.
   * @returns The amount removed from the pot.
   */
  removeFromPot(amount: number): number {
    if (amount <= 0 || !Number.isInteger(amount)) 
        throw new Error("Amount to remove from pot must be a positive integer.");
    if (amount > this.pot) 
        throw new Error("Amount exceeds current pot size.");
    this.pot -= amount;
    return amount;
  }

  /**
   * Deals community cards onto the table.
   * 
   * @param cards - An array of Card objects to place on the table.
   */
  dealCommunityCards(cards: Card[]): void {
    this.communityCards = this.communityCards.concat(cards);
  }

  /**
   * Clears the community cards, typically at the end of a round.
   */
  clearCommunityCards(): void {
    this.communityCards = [];
  }

  /**
   * Clears the pot, typically at the end of a round.
   */
  clearPot(): void {
    this.pot = 0;
  }
}
