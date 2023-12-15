import React, { FC } from 'react';
import { KeysIcon } from 'ui-kit/icons';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { Title } from 'ui-kit/Title';
import { CommonInfoWrapper } from '../ApartmentProfile.styled';
import { PersonTypeDictionary } from './HomeownersList.constants';
import { HomeownerWrapper } from './HomeownersList.styled';
import { HomeownersListProps } from './HomeownersList.types';

export const HomeownersList: FC<HomeownersListProps> = ({ homeowners }) => {
  return (
    <div>
      {homeowners.map((homeowner) => (
        <HomeownerWrapper key={homeowner.id}>
          <Title icon={<KeysIcon />}>{homeowner.name}</Title>
          <CommonInfoWrapper>
            <CommonInfo
              items={[
                {
                  key: 'Номер лицевого счета',
                  value: homeowner.personalAccountNumber,
                },
                {
                  key: 'Платежный код',
                  value: homeowner.paymentCode,
                },
                {
                  key: 'Статус собственника',
                  value: '—',
                },
                {
                  key: 'Юридическое состояние',
                  value: PersonTypeDictionary[homeowner.personType],
                },
                {
                  key: 'Контактный номер телефона',
                  value: (homeowner.phoneNumbers || []).toString(),
                },
              ]}
            />
          </CommonInfoWrapper>
        </HomeownerWrapper>
      ))}
    </div>
  );
};
