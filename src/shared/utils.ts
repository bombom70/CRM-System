export const useIsAdmin = () => {
  const item = localStorage.getItem('isAdmin');
  let parseItem = false;

  if (item) {
    parseItem = JSON.parse(item);
  }

  return parseItem;
};

export const formateDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
