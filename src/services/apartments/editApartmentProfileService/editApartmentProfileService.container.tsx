import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editApartmentProfileService } from './editApartmentProfileService.model';
import { EditApartmentPage } from './view/EditApartmentPage';

const { outputs, gates } = editApartmentProfileService;
const { ApartmentGate } = gates;

export const EditApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const apartment = useStore(outputs.$apartment);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      {apartmentId && <ApartmentGate apartmentId={Number(apartmentId)} />}
      <EditApartmentPage apartment={apartment} isLoading={isLoading} />
    </>
  );
};
