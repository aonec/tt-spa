import { convertDateDots } from "../../../_api/utils/convertDate";

export const useInformationDevice = ({
  device = null,
  housingStockId = null,
}) => {
  if (!device) return { hidden: true };
  const {
    icon,
    fill,
    serialNumber,
    model,
    id,
    futureCheckingDate,
    lastCheckingDate,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    diameter,
  } = device;
  return {
    hidden: false,
    icon: { icon, fill },
    number: serialNumber,
    model,
    url: `/objects/${housingStockId}/devices/${id}`,
    list: [
      // ["Связь с прибором", "-"],
      ['ID узла', ''],
      [
        'Дата начала действия акта-допуска',
        // new Date(commercialAccountingDate).toLocaleDateString(),
        convertDateDots(lastCommercialAccountingDate) || '-'
      ],
      ['Диаметр', diameter],
      [
        'Дата окончания действия акта-допуска',
        // new Date(futureCheckingDate).toLocaleDateString(),
        convertDateDots(futureCommercialAccountingDate) || '-'
      ],
      [
        'Дата поверки прибора',
        convertDateDots(lastCheckingDate) || '-'
        // new Date(lastCheckingDate).toLocaleDateString(),
      ],
      [
        'Дата следующей поверки прибора',
        convertDateDots(futureCheckingDate) || '-'
        // new Date(lastCheckingDate).toLocaleDateString(),
      ],
      // ['Форм-фактор', '-'],
      // ['Документ', '-'],
    ]
      .map(({ 0: title, 1: value }) => ({ title, value }))
      .filter((i) => i.value),
  };
};
