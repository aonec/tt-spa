import React, { FC } from 'react';
import { Wrapper } from './ApplicationBaseInfo.styled';
import { ApplicationBaseInfoProps } from './ApplicationBaseInfo.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';

export const ApplicationBaseInfo: FC<ApplicationBaseInfoProps> = ({
  applicationInfo,
}) => {
  return (
    <CommonInfo
      items={[
        {
          key: 'Номер задачи',
          value: applicationInfo?.number,
        },
        {
          key: 'Источник заявки',
          value: applicationInfo?.number,
        },
        {
          key: 'Тип заявки',
          value: applicationInfo?.number,
        },
        {
          key: 'Вид работ',
          value: applicationInfo?.number,
        },
        {
          key: 'Адрес',
          value: applicationInfo?.number,
        },
        {
          key: 'Комментарий к заявке',
          value: applicationInfo?.number,
        },
      ]}
    />
  );
};
