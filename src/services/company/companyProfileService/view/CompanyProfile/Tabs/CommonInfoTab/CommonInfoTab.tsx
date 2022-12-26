import React, { FC } from 'react';
import { CommonInfoTabProps } from './CommonInfoTab.types';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { TabTitle, Wrapper } from './CommonInfoTab.styled';

export const CommonInfoTab: FC<CommonInfoTabProps> = ({}) => {
  return (
    <Wrapper>
      <TabTitle>Информация о компании</TabTitle>
      <CommonInfo
        items={[
          {
            key: 'Название',
            value: '',
          },
          {
            key: 'Адрес',
            value: '',
          },
          {
            key: 'Электронная почта',
            value: '',
          },
          {
            key: 'Контактный телефон ',
            value: '',
          },
          {
            key: 'Часовой пояс',
            value: '',
          },
        ]}
      />
    </Wrapper>
  );
};
