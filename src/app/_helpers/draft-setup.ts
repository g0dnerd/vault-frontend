// Recommended number of rounds for a swiss style tournament
// depending on player number
export function recommendedNumRounds(numPlayers: number) {
  if (numPlayers >= 9 && numPlayers <= 16) {
    return 4;
  }
  if (numPlayers >= 17 && numPlayers <= 32) {
    return 5;
  }
  if (numPlayers >= 33 && numPlayers <= 64) {
    return 6;
  }
  if (numPlayers >= 65 && numPlayers <= 128) {
    return 7;
  }
  if (numPlayers >= 129 && numPlayers <= 226) {
    return 8;
  }
  if (numPlayers >= 227 && numPlayers <= 409) {
    return 9;
  }
  if (numPlayers >= 410) {
    return 10;
  }
  return 3;
}
