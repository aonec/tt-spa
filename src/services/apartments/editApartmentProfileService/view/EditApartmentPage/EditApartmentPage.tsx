import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { getHousingStockAddressString } from 'utils/getHousingStockAddress';
import {
  AdditionalAddressWrapper,
  HeaderInfoWrapper,
  HeaderWrapper,
} from './EditApartmentPage.styled';
import { EditApartmentPageProps } from './EditApartmentPage.types';
import { getHousingStockAddress } from './EditApartmentPage.utils';

export const EditApartmentPage: FC<EditApartmentPageProps> = ({
  apartment,
  isLoading,
}) => {
  const address = apartment?.housingStock?.address?.mainAddress;
  const additionalAddresses =
    apartment?.housingStock?.address?.additionalAddresses;

  return (
    <div>
      <WithLoader isLoading={isLoading}>
        <GoBack />
        <HeaderWrapper>
          <PageHeader
            title={`Кв ${apartment?.apartmentNumber}. Редактирование`}
          />
          <HeaderInfoWrapper>
            <HeaderInfoString>
              <>{address?.city}</>
              <>
                {`${address && getHousingStockAddress(address)} `}
                {Boolean(additionalAddresses?.length) &&
                  additionalAddresses?.map((elem) => (
                    <AdditionalAddressWrapper>
                      {getHousingStockAddress(elem)}
                    </AdditionalAddressWrapper>
                  ))}
              </>
              <>ДУ "{apartment?.housingStock?.houseManagement?.name}"</>
            </HeaderInfoString>
          </HeaderInfoWrapper>
        </HeaderWrapper>
      </WithLoader>
    </div>
  );
};
