// Доработывает бэк //регулярная выгрузка

export enum EEmailSubscriptionType {
  OncePerTwoWeeks = 'OncePerTwoWeeks',
  OncePerMonth = 'OncePerMonth',
  OncePerQuarter = 'OncePerQuarter',
}

export const SubsTypeRadioOptions = [
  { value: EEmailSubscriptionType.OncePerTwoWeeks, label: '1 раз в 2 недели' },
  { value: EEmailSubscriptionType.OncePerMonth, label: '1 раз в месяц' },
  { value: EEmailSubscriptionType.OncePerQuarter, label: '1 раз в квартал' },
];
