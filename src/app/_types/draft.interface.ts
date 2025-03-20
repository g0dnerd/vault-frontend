import { Cube } from './cube.interface';
import { Phase } from './phase.interface';
import { Player } from './player.interface';

export interface Draft {
  id: number;
  tableFirst?: number;
  tableLast?: number;
  started: boolean;
  finished: boolean;
  seated: boolean;
  players?: Player[];
  cube?: Cube;
  phase?: Phase;
}

export interface CreateDraftDto {
  cubeId: number;
  phaseId: number;
  tableFirst?: number;
  tableLast?: number;
}

export interface UpdateDraftDto {
  cubeId?: number;
  phaseId?: number;
  tableFirst?: number;
  tableLast?: number;
}
