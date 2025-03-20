import { Tournament } from './tournaments.interface';

export interface Phase {
  id: number;
  phaseIndex: number;
  tournamentId: number;
  roundAmount: number;
  tournament: Tournament;
}

export interface CreatePhaseDto {
  tournamentId: number;
  roundAmount: number;
}
