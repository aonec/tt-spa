import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { editApartmentProfileService } from './editApartmentProfileService.model';
import { EditApartmentPage } from './view/EditApartmentPage';

const { inputs, outputs, gates, forms } = editApartmentProfileService;
const { ApartmentGate } = gates;

export const EditApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const setTabSection = useEvent(inputs.setTabSection);
  const updateApartmentSuccess = inputs.updateApartmentSuccess;

  const apartment = useStore(outputs.$apartment);
  const isLoading = useStore(outputs.$isLoading);
  const tabSection = useStore(outputs.$tabSection);
  const isUpdatingApartmentLoading = useStore(
    outputs.$isUpdatingApartmentLoading,
  );

  const navigate =  useNavigate();

  useEffect(() => {
    return updateApartmentSuccess.watch(() => {
      navigate(-1);
    }).unsubscribe;
  }, [updateApartmentSuccess, navigate]);

  return (
    <>
      {apartmentId && <ApartmentGate apartmentId={Number(apartmentId)} />}
      <EditApartmentPage
        tabSection={tabSection}
        setTabSection={setTabSection}
        apartment={apartment}
        isLoading={isLoading}
        isUpdatingApartmentLoading={isUpdatingApartmentLoading}
        commonDataForm={forms.editApartmentCommonInfoForm}
      />
    </>
  );
};
