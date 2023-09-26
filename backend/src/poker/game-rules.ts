/**
 * GameRules class defines the rules for a poker game.
 * 
 * It includes static variables for blind levels, and methods
 * for checking valid moves, managing blinds, and other game-related logic.
 */
export class GameRules {
    // Blinds are defined as an array where the first element is the small blind
    // and the second element is the big blind.
    static blinds: number[] = [5, 10];
  
    /**
     * Checks if a given move is valid.
     * 
     * @param move - The move to check. Could be 'call', 'raise', 'fold', etc.
     * @param playerChips - The number of chips the player currently has.
     * @param currentBet - The current highest bet on the table.
     * @param amount - The amount to raise by, if the move is a raise.
     * @returns A boolean indicating if the move is valid.
     */
    static isValidMove(move: string, playerChips: number, currentBet: number, amount: number = 0): boolean {
      switch (move) {
        case 'call':
          return playerChips >= currentBet;
        case 'raise':
          return playerChips >= currentBet + amount && amount >= this.minRaise(currentBet);
        case 'fold':
          return true;
        default:
          return false;
      }
    }
  
    /**
     * Calculates the minimum raise amount based on the current bet.
     * 
     * @param currentBet - The current highest bet on the table.
     * @returns The minimum amount that must be raised by.
     */
    static minRaise(currentBet: number): number {
      return currentBet * 2;
    }
  
    /**
     * Gets the next blind level. For simplicity, we'll assume blinds double each level.
     * 
     * @param currentBlinds - The current blind levels.
     * @returns The next blind levels.
     */
    static getNextBlinds(currentBlinds: number[]): number[] {
      return currentBlinds.map(blind => blind * 2);
    }
  }
  