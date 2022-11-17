import { useStore } from 'effector-react';
import React from 'react';
import { objectMapsService } from './objectMapsService.model';
import { ObjectsMaps } from './view/ObjectsMaps';

const { outputs, gates } = objectMapsService;
const { StreetsWithHousingStocksGate } = gates;

export const ObjectMapsContainer = () => {
  const streetsData = useStore(outputs.$addressesPagedList);

  return (
    <>
      <StreetsWithHousingStocksGate />
      <ObjectsMaps streetsData={streetsData?.items || null} />
    </>
  );
};
