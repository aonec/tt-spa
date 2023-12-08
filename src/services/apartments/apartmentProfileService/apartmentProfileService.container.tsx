import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apartmentProfileService } from './apartmentProfileService.model';
import { ApartmentProfile } from './view/ApartmentProfile';
import { ApartmentSection } from './view/ApartmentProfile/ApartmentProfile.types';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';

const { gates, outputs } = apartmentProfileService;
const { ApartmentGate } = gates;

export const ApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const apartment = useStore(outputs.$apartment);
  const isApartmentLoading = useStore(outputs.$isApartmentLoading);

  const { tabSection } = useParams<{ tabSection: ApartmentSection }>();

  const navigate = useNavigate();

  const isPermitionToEditApartment = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
  ]);

  useEffect(() => {
    if (!tabSection) {
      navigate(`/apartments/${apartmentId}/${ApartmentSection.CommonData}`, {
        replace: true,
      });
    }
  }, []);

  return (
    <>
      {apartmentId && <ApartmentGate apartmentId={Number(apartmentId)} />}
      <ApartmentProfile
        apartment={apartment}
        isApartmentLoading={isApartmentLoading}
        tabSection={tabSection}
        isPermitionToEditApartment={isPermitionToEditApartment}
      />
    </>
  );
};
