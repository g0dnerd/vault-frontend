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

export interface GoogleAuthPayload {
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  picture?: string | undefined;
  given_name?: string | undefined;
  family_name?: string | undefined;
  email_verified?: boolean | undefined;
  hd?: string | undefined;
}

export const strongPasswordPattern: RegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
