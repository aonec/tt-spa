import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editApartmentProfileService } from './editApartmentProfileService.model';
import { EditApartmentPage } from './view/EditApartmentPage';

const { inputs, outputs, gates } = editApartmentProfileService;
const { ApartmentGate } = gates;

export const EditApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const setTabSection = useEvent(inputs.setTabSection);
  const handleUpdateApartment = useEvent(inputs.handleUpdateApartment);
  const updateApartmentSuccess = inputs.updateApartmentSuccess;

  const apartment = useStore(outputs.$apartment);
  const isLoading = useStore(outputs.$isLoading);
  const tabSection = useStore(outputs.$tabSection);
  const isUpdatingApartmentLoading = useStore(
    outputs.$isUpdatingApartmentLoading,
  );

  const history = useHistory();

  useEffect(() => {
    return updateApartmentSuccess.watch(() => {
      history.goBack();
    }).unsubscribe;
  }, [updateApartmentSuccess, history]);

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
