export const validationValue = (value: string) => {
  let textError = '';
  let hasError = false;
  if (value.length < 2) {
    textError = 'minimum number of characters 2';
    hasError = true;
  }
  if (value.length > 64) {
    textError = 'maximum number of characters 64';
    hasError = true;
  }
  return {
    textError,
    hasError,
  };
};
