import { Enrollment, Player, Tournament } from '.';

export interface DraftStandings {
  draftId: number;
  round: number;
  standingsTable: Map<number, DraftScorecard>;
}

export interface DraftScorecard {
  player: Player;
  score: number;
  gamesPlayer: number;
  gameWon: number;
  pmw: number;
  omw: number;
  pgw: number;
  ogw: number;
}

export interface TournamentStandings {
  tournament: Tournament;
  standings: Record<number, Enrollment>;
}
