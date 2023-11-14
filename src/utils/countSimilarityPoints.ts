export function countSimilarityPoints(search: string, string: string) {
  let street = string.toLowerCase();

  const searchArr = search.toLowerCase().split(' ').filter(Boolean);

  let points = 0;

  if (street.indexOf(search.toLowerCase()) === 0) {
    points += 1;
  }

  points += searchArr.reduce((points, searchSlice) => {
    if (street.includes(searchSlice)) {
      street = street.replace(searchSlice, '');
      return points + 1;
    }
    return points;
  }, 0);

  return points;
}
