import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Tabs } from 'ui-kit/Tabs';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import {
  AdditionalAddressWrapper,
  HeaderWrapper,
  TabsWrapper,
  Wrapper,
} from './ApartmentProfile.styled';
import {
  ApartmentProfileProps,
  ApartmentSection,
} from './ApartmentProfile.types';

export const ApartmentProfile: FC<ApartmentProfileProps> = ({
  apartment,
  isApartmentLoading,
  tabSection,
}) => {
  const history = useHistory();

  const address = apartment?.housingStock?.address?.mainAddress;
  const additionalAddresses =
    apartment?.housingStock?.address?.additionalAddresses;

  return (
    <WithLoader isLoading={isApartmentLoading}>
      {apartment && (
        <Wrapper>
          <GoBack />
          <HeaderWrapper>
            <PageHeader
              title={`Кв. №${apartment.apartmentNumber}`}
              contextMenu={{
                menuButtons: [
                  {
                    title: 'Редактировать квартиру',
                    onClick: () =>
                      history.push(`/apartments/${apartment.id}/edit`),
                  },
                ],
              }}
            />
            <HeaderInfoString>
              <>{address?.city}</>
              <>
                {`${address && getHousingStockItemAddress(address)} `}
                {additionalAddresses?.map((elem) => (
                  <AdditionalAddressWrapper>
                    {getHousingStockItemAddress(elem)}
                  </AdditionalAddressWrapper>
                ))}
              </>
              <>ДУ "{apartment?.housingStock?.houseManagement?.name}"</>
            </HeaderInfoString>
          </HeaderWrapper>
          <TabsWrapper>
            <Tabs
              activeKey={tabSection}
              onChange={(activeKey) =>
                history.push(
                  `/apartments/${apartment.id}/${activeKey as ApartmentSection}`
                )
              }
            >
              <Tabs.TabPane
                tab="Общие данные"
                key={ApartmentSection.CommonData}
              >
                дата
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Собственники"
                key={ApartmentSection.Homeowners}
              >
                Собственники
              </Tabs.TabPane>
              <Tabs.TabPane tab="Документы" key={ApartmentSection.Documents}>
                Документы
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Журнал актов"
                key={ApartmentSection.ActsJournal}
              >
                Журнал актов
              </Tabs.TabPane>
            </Tabs>
          </TabsWrapper>
        </Wrapper>
      )}
    </WithLoader>
  );
};
