export const useApartments = ({ apartments = {} }, { filter = "" }) => {
  console.log(apartments)
  const { loading, items = [], housingStock } = apartments
  return {
    loading,
    items: items
      .map((item) => ({
        ...item,
        title: `${housingStock.street}, ${housingStock.number}, кв.${item.apartmentNumber}`,
        owner: item.homeownerName,
        number: item.personalAccountNumber,
      }))
      .filter(({ apartmentNumber }) => apartmentNumber.includes(filter)),
  }
}
