export const validationValue = (value: string) => {
  if (value.length < 2) {
    return Promise.reject(new Error('Minimum number of characters 2'));
  }
  if (value.length > 64) {
    return Promise.reject(new Error('Maximum number of characters 64'));
  }
  return Promise.resolve();
};
