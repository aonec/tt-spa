import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { apartmentSealService } from './apartmentSealService.model';
import { useEvent, useStore } from 'effector-react';
import { ApartmentSealProfile } from './view/ApartmentSealProfile';

const { inputs, outputs, gates } = apartmentSealService;
const { ApartmentGate } = gates;

export const ApartmentSealContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const isApartmentLoading = useStore(outputs.$isApartmentLoading);
  const apartment = useStore(outputs.$apartment);
  const selectedHomeownerName = useStore(outputs.$selectedHomeownerName);
  const individualDevices = useStore(outputs.$individualDevices);

  const searchApartment = useEvent(inputs.handleSearchApartment);
  const setSelectedHomeownerName = useEvent(inputs.setSelectedHomeownerName);
  const updateApartment = useEvent(inputs.handleUpdateApartment);

  useEffect(() => {
    return inputs.handleApartmentLoaded.watch((apartment) => {
      if (!apartment || apartment.id === Number(id)) return;

      history.push(`/services/seal/apartment/${apartment.id}`);
    }).unsubscribe;
  }, [history, id]);

  return (
    <>
      <ApartmentGate id={Number(id)} />
      <ApartmentSealProfile
        apartment={apartment}
        isLoadingApartment={isApartmentLoading}
        searchApartment={searchApartment}
        setSelectedHomeownerName={setSelectedHomeownerName}
        selectedHomeownerName={selectedHomeownerName}
        updateApartment={updateApartment}
        individualDevices={individualDevices}
      />
    </>
  );
};
