import React, { FC } from 'react';
import { ApplicationBaseInfoProps } from './ApplicationBaseInfo.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { LinkSC, SkeletonLoader } from './ApplicationBaseInfo.styled';
import { TaskTypeDictionary } from 'dictionaries';

export const ApplicationBaseInfo: FC<ApplicationBaseInfoProps> = ({
  applicationInfo,
  address,
  addressLinkPath,
  isLoading,
}) => {
  return (
    <CommonInfo
      items={[
        {
          key: 'Номер задачи в источнике',
          value: isLoading ? (
            <SkeletonLoader active={true} />
          ) : (
            applicationInfo?.number
          ),
        },
        {
          key: 'Источник заявки',
          value: isLoading ? (
            <SkeletonLoader active={true} />
          ) : (
            applicationInfo?.source
          ),
        },
        {
          key: 'Тип заявки',
          value: isLoading ? (
            <SkeletonLoader active={true} />
          ) : (
            applicationInfo?.type && TaskTypeDictionary[applicationInfo?.type]
          ),
        },
        {
          key: 'Вид работ',
          value: isLoading ? (
            <SkeletonLoader active={true} />
          ) : (
            applicationInfo?.category
          ),
        },
        {
          key: 'Адрес',
          value: isLoading ? (
            <SkeletonLoader active={true} />
          ) : (
            <LinkSC to={addressLinkPath} target="_blank">
              {address}
            </LinkSC>
          ),
        },
        {
          key: 'Описание',
          value: isLoading ? (
            <SkeletonLoader active={true} />
          ) : (
            applicationInfo?.description
          ),
        },
        {
          key: 'Комментарий к заявке',
          value: isLoading ? (
            <SkeletonLoader active={true} />
          ) : (
            applicationInfo?.comment
          ),
        },
      ]}
    />
  );
};
