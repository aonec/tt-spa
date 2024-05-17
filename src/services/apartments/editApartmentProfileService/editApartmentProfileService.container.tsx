import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editApartmentProfileService } from './editApartmentProfileService.model';
import { EditApartmentPage } from './view/EditApartmentPage';

const { inputs, outputs, gates } = editApartmentProfileService;
const { ApartmentGate } = gates;

export const EditApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const updateApartmentSuccess = inputs.updateApartmentSuccess;

  const {
    apartment,
    isLoading,
    isUpdatingApartmentLoading,
    setTabSection,
    tabSection,
    commonDataInitialValues,
    handleEditCommonData,
  } = useUnit({
    setTabSection: inputs.setTabSection,
    apartment: outputs.$apartment,
    isLoading: outputs.$isLoading,
    tabSection: outputs.$tabSection,
    isUpdatingApartmentLoading: outputs.$isUpdatingApartmentLoading,
    commonDataInitialValues: outputs.$commonDataInitialValues,
    handleEditCommonData: inputs.handleEditCommonData,
  });
  const navigate = useNavigate();

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
        commonDataInitialValues={commonDataInitialValues}
        handleEditCommonData={handleEditCommonData}
      />
    </>
  );
};
