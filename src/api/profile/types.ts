export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export enum Roles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

export type ProfileRequest = Pick<
  Profile,
  'username' | 'email' | 'phoneNumber'
>;

export type PasswordRequest = Pick<UserRegistration, 'password'>;

export interface Token {
  accessToken: string;
  refreshToken: string;
}
