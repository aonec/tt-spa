export const useApartments = ({ apartments = {} }, { filter = '' }) => {
  const { loading, items = [] } = apartments;
  return {
    loading,
    items: items
      .map((item) => ({
        ...item,
        // title: `${housingStock.street}, ${housingStock.number}, кв.${item.apartmentNumber}`,
        // TODO проверить отображение корпуса внизу
        title: `${item.housingStock.street}, ${
          item.housingStock.number
        }, кв.${item.apartmentNumber}${
          item.housingStock.corpus ? `, ${item.housingStock.corpus}` : ""
        }`,
        owner: item.homeownerName,
        number: item.personalAccountNumber,
      }))
      .filter(({ apartmentNumber }) => apartmentNumber.includes(filter)),
  };
};
