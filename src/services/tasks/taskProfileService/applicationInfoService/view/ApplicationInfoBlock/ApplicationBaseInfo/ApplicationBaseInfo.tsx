import React, { FC } from 'react';
import { ApplicationBaseInfoProps } from './ApplicationBaseInfo.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { LinkSC } from './ApplicationBaseInfo.styled';
import { TaskTypeDictionary } from 'dictionaries';

export const ApplicationBaseInfo: FC<ApplicationBaseInfoProps> = ({
  applicationInfo,
  address,
  addressLinkPath,
  isLoading,
}) => {
  return (
    <CommonInfo
      isLoading={isLoading}
      items={[
        {
          key: 'Номер задачи в источнике',
          value: applicationInfo?.number,
        },
        {
          key: 'Источник заявки',
          value: applicationInfo?.source,
        },
        {
          key: 'Тип заявки',
          value:
            applicationInfo?.type && TaskTypeDictionary[applicationInfo?.type],
        },
        {
          key: 'Вид работ',
          value: applicationInfo?.category,
        },
        {
          key: 'Адрес',
          value: (
            <LinkSC to={addressLinkPath} target="_blank">
              {address}
            </LinkSC>
          ),
        },
        {
          key: 'Описание',
          value: applicationInfo?.description,
        },
        {
          key: 'Комментарий к заявке',
          value: applicationInfo?.comment,
        },
      ]}
    />
  );
};
