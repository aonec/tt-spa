import React from 'react';

import { Objects } from '../../../Objects';

const initialState = {
  city: '' as string,
  Street: '' as string,
  HousingStockNumber: '' as string,
  corpus: '' as string,
};

export type HouseSearchType = typeof initialState;

const HouseReadings = () => {
  return (
    <div>
      <Objects isReadings />
    </div>
  );
};

export default HouseReadings;
