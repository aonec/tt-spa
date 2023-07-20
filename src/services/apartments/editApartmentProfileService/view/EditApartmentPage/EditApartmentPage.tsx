import React, { FC } from 'react';
import { GoBack } from 'ui-kit/sharedComponents/GoBack';
import { HeaderInfoString } from 'ui-kit/sharedComponents/HeaderInfoString';
import {
  AdditionalAddressWrapper,
  PageHeaderSC,
  TabsSC,
} from './EditApartmentPage.styled';
import { EditApartmentPageProps } from './EditApartmentPage.types';
import { TabsSection } from '../../editApartmentProfileService.types';
import { EditCommonDataForm } from './EditCommonDataForm';
import { WithLoader } from 'ui-kit/sharedComponents/WithLoader';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { EditHomeownersList } from './EditHomeownersList';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';

const { TabPane } = TabsSC;

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
        >
          <TabPane tab="Общие данные" key={TabsSection.CommonData}>
            {apartment && (
              <EditCommonDataForm
                apartment={apartment}
                handleUpdateApartment={handleUpdateApartment}
                isUpdatingApartmentLoading={isUpdatingApartmentLoading}
              />
            )}
          </TabPane>
          <TabPane tab="Собственники" key={TabsSection.Homeowners}>
            {filteredHomeownerAccounts && (
              <EditHomeownersList homeowners={filteredHomeownerAccounts} />
            )}
          </TabPane>
          <TabPane tab="Журнал актов" key={TabsSection.ActsJournal}>
            <ApartmentActsListContainer />
          </TabPane>
        </TabsSC>
      </WithLoader>
    </div>
  );
};
