/* eslint-disable */

export const formQueryString = (searchState) => {
  const queryArray = [];
  for (let key in searchState) {
    if (!searchState[key]) continue;
    queryArray.push(`${key}=${searchState[key]}`);
  }
  let queryString = queryArray.join('&');
  if (queryArray.length) {
    queryString = '?' + queryString;
  }
  return queryString;
};
