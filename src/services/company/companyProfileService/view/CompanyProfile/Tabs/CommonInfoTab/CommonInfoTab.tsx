import React, { FC } from 'react';
import { CommonInfoTabProps } from './CommonInfoTab.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { TabTitle, Wrapper } from './CommonInfoTab.styled';
import { OrganizationAddressResponse } from 'api/types';

export const CommonInfoTab: FC<CommonInfoTabProps> = ({
  currentManagingFirm,
}) => {
  const getHousingStockAddress = (
    address: OrganizationAddressResponse | null,
  ) => {
    if (!address) return null;

    const { city, corpus, street, houseNumber } = address || {};

    const cityText = city ? `${city}` : '';
    const streetText = street ? `, ${street}` : '';
    const houseNumberText = houseNumber ? `, ${houseNumber}` : '';
    const corpusText = corpus ? `, корпус ${corpus}` : '';

    return `${cityText}${streetText}${houseNumberText}${corpusText}`;
  };

  const name = currentManagingFirm?.name;
  const address =
    currentManagingFirm?.address &&
    getHousingStockAddress(currentManagingFirm?.address);
  const email = currentManagingFirm?.email;
  const cellPhone = currentManagingFirm?.phoneNumber;
  // const timeZone = currentManagingFirm?.workingTime;

  return (
    <Wrapper>
      <TabTitle>Информация о компании</TabTitle>
      <CommonInfo
        items={[
          {
            key: 'Название',
            value: name,
          },
          {
            key: 'Адрес',
            value: address,
          },
          {
            key: 'Электронная почта',
            value: email,
          },
          {
            key: 'Контактный телефон ',
            value: cellPhone,
          },
          // {
          //   key: 'Часовой пояс',
          //   value: timeZone,
          // },
        ]}
      />
    </Wrapper>
  );
};
