export enum IndividualDeviceConsumptionGraphType {
  BySixMonths = 'BySixMonths',
  ByTwelveMonths = 'ByTwelveMonths',
}

export const IndividualDeviceConsumptionGraphLookup: {
  [key in IndividualDeviceConsumptionGraphType]: string;
} = {
  [IndividualDeviceConsumptionGraphType.BySixMonths]: 'За последние 6 месяцев',
  [IndividualDeviceConsumptionGraphType.ByTwelveMonths]:
    'За последние 12 месяцев',
};
