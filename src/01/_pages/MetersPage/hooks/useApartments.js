export const useApartments = ({ apartments = {} }, { filter = '' }) => {
  const { loading, items = [], housingStock } = apartments;
  const { housingStockNumber, corpus } = { ...housingStock };
  return {
    loading,
    items: items
      .map((item) => ({
        ...item,
        // title: `${housingStock.street}, ${housingStock.number}, кв.${item.apartmentNumber}`,
        // TODO проверить отображение корпуса внизу
        title: `${housingStock.street}, ${housingStockNumber}, кв.${
          item.apartmentNumber
        }${corpus ? `, ${corpus}` : null}`,
        owner: item.homeownerName,
        number: item.personalAccountNumber,
      }))
      .filter(({ apartmentNumber }) => apartmentNumber.includes(filter)),
  };
};
