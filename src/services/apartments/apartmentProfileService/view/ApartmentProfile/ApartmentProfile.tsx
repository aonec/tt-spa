import React, { FC, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActsCardContainer } from 'services/apartments/actsCardService';
import { ApartmentActsListContainer } from 'services/apartments/apartmentActsListService';
import { ApartmentIndividualDevicesMetersContainer } from 'services/meters/apartmentIndividualDevicesMetersService';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { GoBack } from 'ui-kit/shared/GoBack';
import { HeaderInfoString } from 'ui-kit/shared/HeaderInfoString';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Tabs } from 'ui-kit/Tabs';
import { Title } from 'ui-kit/Title';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { ApartmentOnPauseAlert } from './ApartmentOnPauseAlert';
import {
  AdditionalAddressWrapper,
  BaseContentWrapper,
  CardsWrapper,
  CommonInfoWrapper,
  ContentWrapper,
  Deviceswrapper,
  PageHeaderSC,
  TabsWrapper,
} from './ApartmentProfile.styled';
import {
  ApartmentProfileProps,
  ApartmentSection,
} from './ApartmentProfile.types';
import { HomeownersList } from './HomeownersList';
import { LinkCard } from 'ui-kit/shared/LinkCard';
import queryString from 'query-string';
import { TaskGroupingFilter } from 'api/types';

export const ApartmentProfile: FC<ApartmentProfileProps> = ({
  apartment,
  isApartmentLoading,
  tabSection,
  isPermitionToEditApartment,
}) => {
  const navigate = useNavigate();

  const address = apartment?.housingStock?.address?.mainAddress;
  const additionalAddresses =
    apartment?.housingStock?.address?.additionalAddresses;
  const tasksCount = apartment?.activeTaskIds?.length || 0;

  const homeowner =
    apartment?.homeownerAccounts?.find(
      (elem) => elem.isMainPersonalAccountNumber,
    ) || apartment?.homeownerAccounts?.[0];

  const filteredHomeownerAccounts =
    apartment?.homeownerAccounts?.filter((elem) => !elem.closedAt) || [];

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
        <ApartmentOnPauseAlert apartment={apartment} />

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
                value: apartment.numberOfLiving,
              },
              {
                key: 'Нормативное количество проживающих',
                value: apartment.normativeNumberOfLiving,
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
      <HomeownersList homeowners={filteredHomeownerAccounts} />
    ),
    [ApartmentSection.Testimony]: apartment && (
      <Deviceswrapper>
        <ApartmentOnPauseAlert apartment={apartment} />

        <ApartmentIndividualDevicesMetersContainer
          maxWidth={860}
          apartment={apartment}
          editable={false}
        />
      </Deviceswrapper>
    ),
    [ApartmentSection.ActsJournal]: <ApartmentActsListContainer />,
  };

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: ApartmentSection.CommonData },
      { label: 'Собственники', key: ApartmentSection.Homeowners },
      { label: 'Приборы учета', key: ApartmentSection.Testimony },
      { label: 'Журнал актов', key: ApartmentSection.ActsJournal },
    ],
    [],
  );

  return (
    <WithLoader isLoading={isApartmentLoading}>
      {apartment && (
        <div>
          <GoBack />
          <PageHeaderSC
            title={`Кв. №${apartment.apartmentNumber}`}
            contextMenu={{
              menuButtons: [
                {
                  title: 'Редактировать квартиру',
                  onClick: () => navigate(`/apartments/${apartment.id}/edit`),
                  hidden: !isPermitionToEditApartment,
                },
              ],
            }}
          />
          <HeaderInfoString>
            <>{address?.city}</>
            <>
              {`${address && getHousingStockItemAddress(address)} `}
              {additionalAddresses?.map((elem) => (
                <AdditionalAddressWrapper key={elem.id}>
                  {getHousingStockItemAddress(elem)}
                </AdditionalAddressWrapper>
              ))}
            </>
            <>ДУ "{houseManagement?.name}"</>
          </HeaderInfoString>
          <TabsWrapper>
            <Tabs
              activeKey={tabSection}
              onChange={(activeKey) =>
                navigate(
                  `/apartments/${apartment.id}/${
                    activeKey as ApartmentSection
                  }`,
                  {
                    replace: true,
                  },
                )
              }
              items={tabItems}
            />
          </TabsWrapper>
          <ContentWrapper>
            <BaseContentWrapper>
              {tabSection && ContentComponentsDictionary[tabSection]}
            </BaseContentWrapper>
            <CardsWrapper>
              <LinkCard
                text={`Задачи: ${tasksCount}`}
                link={queryString.stringifyUrl({
                  url: `/tasks/list/${TaskGroupingFilter.Executing}`,
                  query: { apartmentId: apartment.id },
                })}
                showLink={Boolean(tasksCount)}
              />
              <ActsCardContainer apartmentId={String(apartment.id)} />
            </CardsWrapper>
          </ContentWrapper>
        </div>
      )}
    </WithLoader>
  );
};
