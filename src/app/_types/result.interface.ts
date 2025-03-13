import { Player } from './player.interface';

export interface Result {
  player1Wins: number;
  player2Wins: number;
  resultConfirmed?: boolean;
  reportedBy?: Player;
  reportedById?: number;
}
