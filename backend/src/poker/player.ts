import { Card } from './card';

/*----------------------------------------------------------------------------*/

/**
 * The Player class represents a player at the table.
 * 
 * It maintains the player's current hand, their chip count,
 * and provides methods for game actions like betting and folding.
 */
export class Player {
  /**
   * Constructs a new player object.
   * 
   * @param id - Unique identifier for the player.
   * @param chips - Initial number of chips the player has.
   * @param hand - An array representing the player's hand, empty by default.
   */
  constructor(
    public id: string,
    public chips: number,
    public hand: Card[] = []
  ) { 
    if (chips < 0) {
        throw new Error("Initial chips must be non-negative.");
  }
}

/*----------------------------------------------------------------------------*/

  /**
   * Adds a card to the player's hand.
   * 
   * @param card - The card to add.
   */
  addToHand(card: Card): void {
    this.hand.push(card);
  }

/*----------------------------------------------------------------------------*/

  /**
   * Clears the player's hand, typically done at the end of a round.
   */
  clearHand(): void {
    this.hand = [];
  }

/*----------------------------------------------------------------------------*/

    /**
     * Places a bet, reducing the player's chip count.
     * 
     * @param amount - The amount to bet.
     * @throws {Error} If player does not have enough chips to bet.
     */
    bet(amount: number): void {
        if (amount <= 0 || !Number.isInteger(amount)) 
            throw new Error("Bet amount must be a positive integer.");
        if (amount > this.chips) 
            throw new Error("Insufficient chips for this bet.");
        this.chips -= amount;
    }   

/*----------------------------------------------------------------------------*/

    /**
     * Adds chips to the player's chip count, usually from winning a pot.
     * 
     * @param amount - The amount to add.
     */
    addChips(amount: number): void {
        if (amount < 0) 
            throw new Error("Cannot add a negative amount of chips.");
        this.chips += amount;
    }

/*----------------------------------------------------------------------------*/

    /**
     * Makes the player fold, effectively removing them from the current round.
     * 
     * This method could be extended to include round-specific logic.
     */
    fold(): void {
        // Logic for folding can be more complex depending on game rules.
        this.clearHand();
    }
}
