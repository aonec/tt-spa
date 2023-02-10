import { ReportAddress } from './ReportViewTable.types';

export const getReportElemAddress = (
  address: ReportAddress,
  type: 'house' | 'apartment' = 'apartment',
) => {
  const addressArray = [address.city, address.street];

  if (type === 'apartment') {
    addressArray.push(`${address.houseNumber}${address.corpus || ''}`);
  }

  return {
    number: address.apartmentNumber,
    addressString: addressArray.join(', '),
  };
};
