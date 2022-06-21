/* eslint-disable */

import moment from 'moment';

export function isDateEmpty(value) {
  return value === null ? null : moment(value);
}
