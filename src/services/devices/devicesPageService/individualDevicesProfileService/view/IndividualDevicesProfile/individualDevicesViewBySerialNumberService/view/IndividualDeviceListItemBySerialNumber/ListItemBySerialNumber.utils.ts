import { ApartmentAddress, HomeownerAccount } from 'api/myApi';

export const getApartmentAddressForList = (
  apartment: ApartmentAddress | null | undefined,
) => {
  if (!apartment) {
    return null;
  }

  const corpusText = apartment.houseCorpus
    ? `, корпус ${apartment?.houseCorpus}`
    : '';
  const apartmentNumberText = apartment?.apartmentNumber
    ? `, кв. ${apartment.apartmentNumber}`
    : '';

  return `${apartment.city}, ул. ${apartment.street} ${apartment.houseNumber}${corpusText}${apartmentNumberText}`;
};

export const getHomeownerName = (homeowners: HomeownerAccount[]) => {
  if (!homeowners.length) {
    return {
      name: '',
      personalNumber: '',
    };
  }
  const mainHomeowner = homeowners.find(
    (homeowner) => homeowner.isMain === true,
  );
  if (mainHomeowner) {
    return {
      name: mainHomeowner.fullName || '',
      personalNumber: mainHomeowner.personalAccountNumber || '',
    };
  }
  return {
    name: homeowners[0].fullName || '',
    personalNumber: homeowners[0].personalAccountNumber || '',
  };
};
