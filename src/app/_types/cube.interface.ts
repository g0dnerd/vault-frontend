import { User } from './user.interface';

export interface Cube {
  id: number;
  creator?: User;
  name: string;
  numCards?: number;
  shortDescription?: string;
  longDescription: string;
  cobraUrl: string;
  imageUrl?: string;
}
