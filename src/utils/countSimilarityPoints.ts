export function countSimilarityPoints(
    addressSearch: string,
    addressString: string
  ) {
    const str = addressString.toLowerCase();
  
    const addressSearchArr = addressSearch.toLowerCase().split(' ');
  
    return addressSearchArr.reduce(
      (acc, addressSearchSlice) =>
        str.includes(addressSearchSlice) ? acc + 1 : acc,
      0
    );
  }
  