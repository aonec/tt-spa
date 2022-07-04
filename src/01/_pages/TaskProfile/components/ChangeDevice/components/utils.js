/* eslint-disable */

import moment from 'time';

export function isDateEmpty(value) {
  return value === null ? null : moment(value);
}
