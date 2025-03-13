export interface Tournament {
  id: number;
  name: string;
  public: boolean;
  playerCapacity: number;
  description: string | null;
  isLeague: boolean;
}
