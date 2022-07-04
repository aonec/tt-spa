import moment from 'time';

const isDateNull = (date) => {
  return date === null ? null : moment(date);
};
export default isDateNull;
