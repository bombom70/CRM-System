export const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 0,
  immediate = false
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    if (immediate && !timeout) callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
