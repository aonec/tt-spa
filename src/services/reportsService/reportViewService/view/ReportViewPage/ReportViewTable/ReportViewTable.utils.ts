import { ReportAddress } from './ReportViewTable.types';

export const getReportElemAddress = (address: ReportAddress) => {
  const addressArray = [
    address.city,
    address.street,
    `${address.houseNumber}${address.corpus}`,
  ];

  return {
    apartmentNumber: address.apartmentNumber,
    addressString: addressArray.join(', '),
  };
};
