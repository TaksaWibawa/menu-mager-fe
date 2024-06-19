import { format, parseISO } from 'date-fns';

export function formatDate(dateString, formatString = 'dd/MM/yyyy') {
  if (!dateString) {
    return '';
  }

  const date = parseISO(dateString);
  return format(date, formatString);
}
