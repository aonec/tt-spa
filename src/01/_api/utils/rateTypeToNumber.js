const rateTypeToNumber = (rateType) => {
  switch (rateType) {
    case 'OneZone':
      return 1;
    case 'TwoZone':
      return 2;
    case 'ThreeZone':
      return 3;
    case 'FourZone':
      return 4;
  }
  return null
};

export default rateTypeToNumber;
