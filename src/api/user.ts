import { httpClient } from './httpClient.ts';
import {
  AuthData,
  Profile,
  RefreshToken,
  Token,
  UserRegistration,
} from '../shared/types.ts';

export const fetchSignup = async (
  userRegistrationBody: UserRegistration
): Promise<Profile> => {
  try {
    const { data, status, statusText } = await httpClient.post(
      '/auth/signup',
      userRegistrationBody
    );

    if (status !== 201) {
      throw new Error(statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchSignin = async (authData: AuthData): Promise<Token> => {
  try {
    const { data, status, statusText } = await httpClient.post(
      '/auth/signin',
      authData
    );

    if (status !== 200) {
      throw new Error(statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchRefresh = async (
  refreshToken: RefreshToken
): Promise<Token> => {
  try {
    const { data } = await httpClient.post('/auth/refresh', refreshToken);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchLogout = async () => {
  try {
    await httpClient.post('/user/logout');
  } catch (error) {
    throw error;
  }
};
