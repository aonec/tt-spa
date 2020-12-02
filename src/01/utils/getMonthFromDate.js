import moment from 'moment';

const firstLetterToUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getMonthFromDate = (dateString) => {
   const month = moment(dateString).format('MMMM');

   return firstLetterToUpperCase(month)
}