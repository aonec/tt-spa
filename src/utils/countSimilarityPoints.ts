export function countSimilarityPoints(
  addressSearch: string,
  addressString: string,
) {
  let str = addressString.toLowerCase();

  const addressSearchArr = addressSearch
    .toLowerCase()
    .split(' ')
    .filter(Boolean);

  return addressSearchArr.reduce((acc, addressSearchSlice) => {
    if (str.includes(addressSearchSlice)) {
      str = str.replace(addressSearchSlice,'')
      return acc + 1;
    }
    return acc;
  }, 0);
}
