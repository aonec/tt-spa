import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apartmentIndividualDevicesMetersService } from './apartmentIndividualDevicesMetersService.model';
import { ApartmentIndividualDevicesMeters } from './view/ApartmentIndividualDevicesMeters';

const {
  outputs,
  gates: { IndividualDevicesGate },
} = apartmentIndividualDevicesMetersService;

export const ApartmentIndividualDevicesMetersContainer = () => {
  const { id } = useParams<{ id: string }>();

  const individualDevicesList = useStore(outputs.$individualDevicesList);

  const isLoading = useStore(outputs.$isLoading);

  console.log(individualDevicesList);

  return (
    <>
      <IndividualDevicesGate ApartmentId={Number(id)} />
      <ApartmentIndividualDevicesMeters
        individualDevicesList={individualDevicesList}
        isLoading={isLoading}
      />
    </>
  );
};
