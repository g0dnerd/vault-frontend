export function recommendedNumRounds(numPlayers: number) {
  if (numPlayers >= 9 && numPlayers <= 16) {
    return 4;
  } else if (numPlayers >= 17 && numPlayers <= 32) {
    return 5;
  } else if (numPlayers >= 33 && numPlayers <= 64) {
    return 6;
  } else if (numPlayers >= 65 && numPlayers <= 128) {
    return 7;
  } else if (numPlayers >= 129 && numPlayers <= 226) {
    return 8;
  } else if (numPlayers >= 227 && numPlayers <= 409) {
    return 9;
  } else if (numPlayers >= 410) {
    return 10;
  } else {
    return 3;
  }
}
