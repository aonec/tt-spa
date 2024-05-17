import React, { FC, ReactNode, useMemo } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
import { HeaderInfoString } from 'ui-kit/shared/HeaderInfoString';
import {
  AdditionalAddressWrapper,
  PageHeaderSC,
  TabsSC,
} from './EditApartmentPage.styled';
import { EditApartmentPageProps } from './EditApartmentPage.types';
import { TabsSection } from '../../editApartmentProfileService.types';
import { EditCommonDataForm } from './EditCommonDataForm';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { EditHomeownersList } from './EditHomeownersList';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';

export const EditApartmentPage: FC<EditApartmentPageProps> = ({
  apartment,
  isLoading,
  tabSection,
  setTabSection,
  isUpdatingApartmentLoading,
  commonDataInitialValues,
  handleEditCommonData,
}) => {
  const address = apartment?.housingStock?.address?.mainAddress;
  const additionalAddresses =
    apartment?.housingStock?.address?.additionalAddresses;

  const filteredHomeownerAccounts =
    apartment?.homeownerAccounts?.filter((elem) => !elem.closedAt) || [];

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: TabsSection.CommonData },
      { label: 'Собственники', key: TabsSection.Homeowners },
      { label: 'Журнал актов', key: TabsSection.ActsJournal },
    ],
    [],
  );

  const components: { [ley in TabsSection]: ReactNode } = {
    [TabsSection.CommonData]: apartment && (
      <EditCommonDataForm
        isUpdatingApartmentLoading={isUpdatingApartmentLoading}
        initialValues={commonDataInitialValues}
        handleEditCommonData={handleEditCommonData}
      />
    ),
    [TabsSection.ActsJournal]: <ApartmentActsListContainer />,
    [TabsSection.Homeowners]: filteredHomeownerAccounts && (
      <EditHomeownersList homeowners={filteredHomeownerAccounts} />
    ),
  };

  return (
    <div>
      <WithLoader isLoading={isLoading}>
        <GoBack />
        <PageHeaderSC
          title={`Кв ${apartment?.apartmentNumber}. Редактирование`}
        />
        <HeaderInfoString>
          <>{address?.city}</>
          <>
            {address && getHousingStockItemAddress(address)}
            {additionalAddresses?.map((elem) => (
              <AdditionalAddressWrapper>
                {getHousingStockItemAddress(elem)}
              </AdditionalAddressWrapper>
            ))}
          </>
          <>ДУ "{apartment?.housingStock?.houseManagement?.name}"</>
        </HeaderInfoString>
        <TabsSC
          activeKey={tabSection}
          onChange={(activeKey) => setTabSection(activeKey as TabsSection)}
          items={tabItems}
        />
        {components[tabSection]}
      </WithLoader>
    </div>
  );
};
