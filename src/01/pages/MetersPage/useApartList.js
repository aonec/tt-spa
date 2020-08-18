export const useApartList = ({ apart = {}, filter = "" }) => {
  if (!apart) return { list: [], message: "Нету ничего" }
  const { items = [], housingStock = {}, loading = false } = apart
  return {
    loading,
    list: items
      .map((item) => ({
        ...item,
        title: `${housingStock.street}, ${housingStock.number}, кв${item.apartmentNumber}`,
        url: `/meters/${item.id}`,
      }))
      .filter((item) => item.apartmentNumber.includes(filter)),
  }
}
