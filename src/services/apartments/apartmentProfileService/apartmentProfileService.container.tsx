import { useUnit } from 'effector-react';
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { apartmentProfileService } from './apartmentProfileService.model';
import { ApartmentProfile } from './view/ApartmentProfile';
import { ApartmentSection } from './view/ApartmentProfile/ApartmentProfile.types';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';

const { gates, outputs } = apartmentProfileService;
const { ApartmentGate } = gates;

export const ApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const { apartment, isApartmentLoading } = useUnit({
    apartment: outputs.$apartment,
    isApartmentLoading: outputs.$isApartmentLoading,
  });

  const { tabSection } = useParams<{ tabSection: ApartmentSection }>();

  const isPermitionToEditApartment = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
  ]);

  return (
    <>
      {!tabSection && (
        <Redirect
          to={`/apartments/${apartmentId}/${ApartmentSection.CommonData}`}
        />
      )}
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
