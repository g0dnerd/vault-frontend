import { Tournament } from './tournaments.interface';
import { User } from './user.interface';

export interface Enrollment {
  id: number;
  tournament?: Tournament;
  tournamentId: number;
  userId: number;
  user: User;
  elo?: number;
}
