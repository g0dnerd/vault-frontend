import { Player } from './player.interface';
import { Round } from './round.interface';

export interface Match {
  id: number;
  roundId: number;
  player1Id: number;
  player1?: Player;
  player2Id: number;
  player2?: Player;
  tableNumber: number;
  player1Wins: number;
  player2Wins: number;
  reportedById?: number;
  reportedBy?: Player;
  resultConfirmed: boolean;
  round?: Round;
  opponentName?: string;
}
