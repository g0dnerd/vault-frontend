export enum Role {
  Player = 'PLAYER',
  Admin = 'ADMIN',
  PlayerAdmin = 'PLAYER_ADMIN',
}

export interface User {
  id: number;
  email: string;
  username: string;
  roles?: Role[];
  bio?: string | undefined;
  profilePicture?: string;
  numTournaments?: number;
  numCubes?: number;
}
