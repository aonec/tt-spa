export const useInformationDevice = ({
  device = null,
  housingStockId = null,
}) => {
  if (!device) return { hidden: true }
  const {
    icon,
    fill,
    serialNumber,
    model,
    id,
    futureCheckingDate,
    lastCheckingDate,
    commercialAccountingDate,
    diameter,
  } = device
  return {
    hidden: false,
    icon: { icon, fill },
    number: serialNumber,
    model,
    url: `/objects/${housingStockId}/devices/${id}`,
    list: [
      ["Связь с прибором", "-"],
      ["ID узла", ""],
      [
        "Постановка на учет",
        new Date(commercialAccountingDate).toLocaleDateString(),
      ],
      ["Диаметр", diameter],
      [
        "Окончание срока эксплуатации",
        new Date(futureCheckingDate).toLocaleDateString(),
      ],
      [
        "Последняя поверка приборов",
        new Date(lastCheckingDate).toLocaleDateString(),
      ],
      ["Форм-фактор", "-"],
      ["Документ", "-"],
    ]
      .map(({ 0: title, 1: value }) => ({ title, value }))
      .filter((i) => i.value),
  }
}
