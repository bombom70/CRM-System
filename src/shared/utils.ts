export const useIsAdmin = () => {
  const item = localStorage.getItem('isAdmin');
  let parseItem = false;

  if (item) {
    parseItem = JSON.parse(item);
  }

  return parseItem;
};
