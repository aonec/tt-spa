import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editApartmentProfileService } from './editApartmentProfileService.model';
import { EditApartmentPage } from './view/EditApartmentPage';

const { inputs, outputs, gates } = editApartmentProfileService;
const { ApartmentGate } = gates;

export const EditApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const setTabSection = useEvent(inputs.setTabSection);
  const handleUpdateApartment = useEvent(inputs.handleUpdateApartment);

  const apartment = useStore(outputs.$apartment);
  const isLoading = useStore(outputs.$isLoading);
  const tabSection = useStore(outputs.$tabSection);
  const isUpdatingApartmentLoading = useStore(outputs.$isUpdatingApartmentLoading);

  return (
    <>
      {apartmentId && <ApartmentGate apartmentId={Number(apartmentId)} />}
      <EditApartmentPage
        tabSection={tabSection}
        setTabSection={setTabSection}
        apartment={apartment}
        isLoading={isLoading}
        handleUpdateApartment={handleUpdateApartment}
        isUpdatingApartmentLoading={isUpdatingApartmentLoading}
      />
    </>
  );
};
