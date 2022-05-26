/* eslint-disable */

export const translateResource = (resource) => {
  switch (resource) {
    case 'HotWaterSupply':
      return 'ГВС';
    case 'ColdWaterSupply':
      return 'ХВС';
    case 'Heat':
      return 'Отопление';
    case 'Electricity':
      return 'Электричество';
  }
};
