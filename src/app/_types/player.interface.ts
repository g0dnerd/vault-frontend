import { Enrollment } from './enrollment.interface';

export interface Player {
  id: number;
  draftId: number;
  checkedIn: boolean;
  checkedOut: boolean;
  enrollmentId: number;
  enrollment?: Enrollment;
  bye: boolean;
  hadBye: boolean;
  seat?: number;
}

export interface PoolStatus {
  checkedIn: boolean;
  checkedOut: boolean;
}
