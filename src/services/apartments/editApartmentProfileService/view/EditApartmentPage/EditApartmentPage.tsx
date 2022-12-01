import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { Tabs } from 'ui-kit/Tabs';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import {
  AdditionalAddressWrapper,
  HeaderInfoWrapper,
  HeaderWrapper,
  TabsWrapper,
} from './EditApartmentPage.styled';
import { EditApartmentPageProps } from './EditApartmentPage.types';
import { TabsSection } from '../../editApartmentProfileService.types';
import { EditCommonDataForm } from './EditCommonDataForm';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { EditHomeownersList } from './EditHomeownersList';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';

export const EditApartmentPage: FC<EditApartmentPageProps> = ({
  apartment,
  isLoading,
  tabSection,
  setTabSection,
  handleUpdateApartment,
  isUpdatingApartmentLoading,
}) => {
  const address = apartment?.housingStock?.address?.mainAddress;
  const additionalAddresses =
    apartment?.housingStock?.address?.additionalAddresses;

  const filteredHomeownerAccounts =
    apartment?.homeownerAccounts?.filter((elem) => !elem.closedAt) || [];

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
                {address && getHousingStockItemAddress(address)}
                {additionalAddresses?.map((elem) => (
                  <AdditionalAddressWrapper>
                    {getHousingStockItemAddress(elem)}
                  </AdditionalAddressWrapper>
                ))}
              </>
              <>ДУ "{apartment?.housingStock?.houseManagement?.name}"</>
            </HeaderInfoString>
          </HeaderInfoWrapper>
        </HeaderWrapper>
        <TabsWrapper>
          <Tabs
            activeKey={tabSection}
            onChange={(activeKey) => setTabSection(activeKey as TabsSection)}
          >
            <Tabs.TabPane tab="Общие данные" key={TabsSection.CommonData}>
              {apartment && (
                <EditCommonDataForm
                  apartment={apartment}
                  handleUpdateApartment={handleUpdateApartment}
                  isUpdatingApartmentLoading={isUpdatingApartmentLoading}
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Собственники" key={TabsSection.Homeowners}>
              {filteredHomeownerAccounts && (
                <EditHomeownersList homeowners={filteredHomeownerAccounts} />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Журнал актов" key={TabsSection.ActsJournal}>
              <ApartmentActsListContainer />
            </Tabs.TabPane>
          </Tabs>
        </TabsWrapper>
      </WithLoader>
    </div>
  );
};
