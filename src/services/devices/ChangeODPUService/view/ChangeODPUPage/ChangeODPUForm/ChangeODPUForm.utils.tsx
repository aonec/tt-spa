import moment from "moment";

export const checkIsDateNotFuture = (date: moment.Moment): boolean => {
  const diff = date.diff(moment());

  return diff > 0;
};
