import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC, ReactNode } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ActsCardContainer } from 'services/apartments/actsCardService';
import { TasksCardContainer } from 'services/apartments/tasksCardService';
import { ApartmentIndividualDevicesMetersContainer } from 'services/meters/apartmentIndividualDevicesMetersService';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Tabs } from 'ui-kit/Tabs';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import {
  AdditionalAddressWrapper,
  ContentWrapper,
  HeaderWrapper,
  TabsWrapper,
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

  const ContentComponentsDictionary: {
    [key in ApartmentSection]: ReactNode;
  } = {
    [ApartmentSection.CommonData]: <></>,
    [ApartmentSection.Homeowners]: <></>,
    [ApartmentSection.Testimony]: apartment && (
      <ApartmentIndividualDevicesMetersContainer
        maxWidth={860}
        apartmentId={apartment.id}
        editable={false}
      />
    ),
    [ApartmentSection.ActsJournal]: <></>,
    [ApartmentSection.Documents]: <></>,
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
              <Tabs.TabPane tab="Документы" key={ApartmentSection.Documents} />
              <Tabs.TabPane
                tab="Журнал актов"
                key={ApartmentSection.ActsJournal}
              />
            </Tabs>
          </TabsWrapper>
          <ContentWrapper>
            <div>{tabSection && ContentComponentsDictionary[tabSection]}</div>
            <div>
              <TasksCardContainer
                apartmentId={String(apartment.id)}
                tasksNumber={apartment.activeTaskIds?.length || 0}
              />
              <ActsCardContainer
                apartmentId={String(apartment.id)}
                housingStockId={String(apartment.housingStock?.id)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </WithLoader>
  );
};
