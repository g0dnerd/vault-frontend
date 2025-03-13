import { Role } from './user.interface';

export interface AuthInterface {
  token: string;
  roles: Role[];
}

export interface AuthPayload {
  email: string;
  password: string;
  username?: string;
}
