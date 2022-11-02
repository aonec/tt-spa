import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { individualDevicesViewBySerialNumberService } from './individualDevicesViesBySerialNumberService.model';
import { IndividualDevicesViewBySerialNumberSearch } from './view/SerialNumberSearch';

const { inputs, outputs } = individualDevicesViewBySerialNumberService;

export const IndividualDevicesViewBySerialNumberContainer = () => {
  const filter = useStore(outputs.$searchPayload);
  const devices = useStore(outputs.$devices);

  const setFilter = useEvent(inputs.setFilter);

  return (
    <IndividualDevicesViewBySerialNumberSearch
      filter={filter}
      setFilter={setFilter}
    />
  );
};
