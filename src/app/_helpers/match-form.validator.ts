import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** A match cannot have more than 3 total games */
export const matchSumValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const p1Wins = control.get('player1Wins');
  const p2Wins = control.get('player2Wins');

  return p1Wins && p2Wins && p1Wins.value + p2Wins.value > 3
    ? { sumExceeded: true }
    : null;
};
