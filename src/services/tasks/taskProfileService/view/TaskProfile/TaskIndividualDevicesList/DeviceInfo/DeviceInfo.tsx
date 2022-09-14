import React, { FC } from 'react';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { RowWrapper } from './DeviceInfo.styled';
import { DeviceInfoProps } from './DeviceInfo.types';
import { getPreparedDate } from './DeviceInfo.utils';

export const DeviceInfo: FC<DeviceInfoProps> = ({ device }) => {
  const {
    resource,
    mountPlace,
    bitDepth,
    scaleFactor,
    openingDate,
    lastCheckingDate,
    futureCheckingDate,
  } = device;
  const resourceText = ResourceLookUp[resource];
  const openingDateText = getPreparedDate(openingDate);
  const lastCheckingDateText = getPreparedDate(lastCheckingDate);
  const futureCheckingDateText = getPreparedDate(futureCheckingDate);

  return (
    <div>
      <RowWrapper>
        <div>Тип ресурса</div>
        <div>{resourceText}</div>
      </RowWrapper>
      {mountPlace && (
        <RowWrapper>
          <div>Место установки</div>
          <div>{mountPlace?.description}</div>
        </RowWrapper>
      )}
      <RowWrapper>
        <div>Разрядность</div>
        <div>{bitDepth}</div>
      </RowWrapper>
      <RowWrapper>
        <div>Множитель</div>
        <div>{scaleFactor}</div>
      </RowWrapper>

      <RowWrapper>
        <div>Дата ввода в эксплуатацию</div>
        <div>{openingDateText}</div>
      </RowWrapper>
      <RowWrapper>
        <div>Дата начальной поверки</div>
        <div>{lastCheckingDateText}</div>
      </RowWrapper>
      <RowWrapper>
        <div>Дата следующей поверки</div>
        <div>{futureCheckingDateText}</div>
      </RowWrapper>
    </div>
  );
};
