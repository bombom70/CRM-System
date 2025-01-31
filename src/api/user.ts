import { httpClient } from './httpClient.ts';
import { UserRegistration } from '../shared/types.ts';

export const fetchUserData = async (
  userRegistrationBody: UserRegistration
): Promise<any> => {
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
