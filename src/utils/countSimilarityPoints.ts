export function countSimilarityPoints(
  addressSearch: string,
  addressString: string,
) {
  let street = addressString.toLowerCase();

  const addressSearchArr = addressSearch
    .toLowerCase()
    .split(' ')
    .filter(Boolean);

  let points = 0;

  if (street.indexOf(addressSearch.toLowerCase()) === 0) {
    points += 1;
  }

  points += addressSearchArr.reduce((points, addressSearchSlice) => {
    if (street.includes(addressSearchSlice)) {
      street = street.replace(addressSearchSlice, '');
      return points + 1;
    }
    return points;
  }, 0);

  return points;
}
