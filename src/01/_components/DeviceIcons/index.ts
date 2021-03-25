// export const DevicesIcons = () => {
//   HotWaterSupply: { icon: 'water', color: '#FF8C68' },
//   ColdWaterSupply: { icon: 'water', color: '#79AFFF' },
//   Electricity: { icon: 'electro', color: '#E2B104' },
// };
// export default DevicesIcons;

const DeviceIcons: {
  [index: string]: { icon: string; color: string; translate: string };
} = {
  HotWaterSupply: {
    icon: 'water',
    color: '#FF8C68',
    translate: 'Горячая вода',
  },
  ColdWaterSupply: {
    icon: 'water',
    color: '#79AFFF',
    translate: 'Холодная вода',
  },
  Electricity: {
    icon: 'electro',
    color: '#E2B104',
    translate: 'Электричество',
  },
  Calculator: {
    icon: 'calendar',
    color: '#272F5A',
    translate: 'Вычислитель',
  },
  Heat: { icon: 'heat', color: '#272F5A', translate: 'Отопление' },
  null: { icon: 'device', color: '#272F5A', translate: '' },
};

export default DeviceIcons;
