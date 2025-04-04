import { format } from 'date-fns';

export const formateDate = (isoDate: string, formatDate = 'dd.MM.yyyy') => {
  return format(isoDate, formatDate);
};
