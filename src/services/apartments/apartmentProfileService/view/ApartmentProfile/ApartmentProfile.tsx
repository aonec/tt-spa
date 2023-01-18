import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { ActsCardContainer } from 'services/apartments/actsCardService';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';
import { TasksCardContainer } from 'services/apartments/tasksCardService';
import { ApartmentIndividualDevicesMetersContainer } from 'services/meters/apartmentIndividualDevicesMetersService';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Tabs } from 'ui-kit/Tabs';
import { Title } from 'ui-kit/Title';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import {
  AdditionalAddressWrapper,
  BaseContentWrapper,
  CardsWrapper,
  CommonInfoWrapper,
  ContentWrapper,
  HeaderWrapper,
  TabsWrapper,
} from './ApartmentProfile.styled';
import {
  ApartmentProfileProps,
  ApartmentSection,
} from './ApartmentProfile.types';
import { HomeownersList } from './HomeownersList';

export const ApartmentProfile: FC<ApartmentProfileProps> = ({
  apartment,
  isApartmentLoading,
  tabSection,
}) => {
  const history = useHistory();

  const address = apartment?.housingStock?.address?.mainAddress;
  const additionalAddresses =
    apartment?.housingStock?.address?.additionalAddresses;

  const homeowner = apartment?.homeownerAccounts?.[0];

  const houseManagement = apartment?.housingStock?.houseManagement;

  const houseManagementInfo =
    houseManagement?.comment &&
    houseManagement?.phone &&
    `${houseManagement?.comment || ''} (${houseManagement?.phone})`;

  const ContentComponentsDictionary: {
    [key in ApartmentSection]: ReactNode;
  } = {
    [ApartmentSection.CommonData]: (
      <CommonInfoWrapper>
        <Title>Информация</Title>
        {apartment && (
          <CommonInfo
            items={[
              {
                key: 'Площадь жилого помещения',
                value: apartment.square && `${apartment.square} м²`,
              },
              {
                key: 'Количество проживающих / зарегистрированных',
                value: apartment.normativeNumberOfLiving,
              },
              {
                key: 'Нормативное количество проживающих',
                value: apartment.numberOfLiving,
              },
              {
                key: 'Основной лицевой счет ',
                value: homeowner?.personalAccountNumber,
              },
              {
                key: 'Основной платежный код',
                value: homeowner?.paymentCode,
              },
              {
                key: 'Управляющая компания',
                value: houseManagement?.name,
              },
              {
                key: 'Информация об УК',
                value: houseManagementInfo,
              },
            ]}
          />
        )}
      </CommonInfoWrapper>
    ),
    [ApartmentSection.Homeowners]: apartment?.homeownerAccounts && (
      <HomeownersList homeowners={apartment?.homeownerAccounts} />
    ),
    [ApartmentSection.Testimony]: apartment && (
      <ApartmentIndividualDevicesMetersContainer
        maxWidth={860}
        apartment={apartment}
        editable={false}
      />
    ),
    [ApartmentSection.ActsJournal]: <ApartmentActsListContainer />,
  };

  return (
    <WithLoader isLoading={isApartmentLoading}>
      {apartment && (
        <div>
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
              />
              <Tabs.TabPane
                tab="Собственники"
                key={ApartmentSection.Homeowners}
              />
              <Tabs.TabPane
                tab="Приборы учета"
                key={ApartmentSection.Testimony}
              />
              <Tabs.TabPane
                tab="Журнал актов"
                key={ApartmentSection.ActsJournal}
              />
            </Tabs>
          </TabsWrapper>
          <ContentWrapper>
            <BaseContentWrapper>
              {tabSection && ContentComponentsDictionary[tabSection]}
            </BaseContentWrapper>
            <CardsWrapper>
              <TasksCardContainer
                apartmentId={String(apartment.id)}
                tasksNumber={apartment.activeTaskIds?.length || 0}
              />
              <ActsCardContainer
                apartmentId={String(apartment.id)}
                housingStockId={String(apartment.housingStock?.id)}
              />
            </CardsWrapper>
          </ContentWrapper>
        </div>
      )}
    </WithLoader>
  );
};
