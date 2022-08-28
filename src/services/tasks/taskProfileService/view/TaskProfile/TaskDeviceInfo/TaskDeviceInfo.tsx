import React, { FC } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getPreparedDate } from '../TaskIndividualDevicesList/DeviceInfo/DeviceInfo.utils';
import {
  Model,
  RowWrapper,
  SerialNumber,
  TitleWrapper,
  Wrapper,
} from './TaskDeviceInfo.styled';
import { TaskDeviceInfoProps } from './TaskDeviceInfo.types';

export const TaskDeviceInfo: FC<TaskDeviceInfoProps> = ({ device }) => {
  const {
    resource,
    serialNumber,
    model,
    id,
    openingDate,
    closingDate,
    lastCheckingDate,
    futureCheckingDate,
    diameter,
  } = device;

  const openingDateText = getPreparedDate(openingDate) || '-';
  const closingDateText = getPreparedDate(closingDate) || '-';
  const lastCheckingDateText = getPreparedDate(lastCheckingDate) || '-';
  const futureCheckingDateText = getPreparedDate(futureCheckingDate) || '-';

  const icon = resource ? (
    <ResourceIconLookup resource={resource} />
  ) : (
    <CalculatorIcon />
  );
  const path = resource ? 'housingMeteringDevices' : 'calculators';

  return (
    <Wrapper>
      <TitleWrapper to={`/${path}/${id}`}>
        {icon}
        <SerialNumber>{serialNumber}</SerialNumber>
        <Model>({model})</Model>
      </TitleWrapper>
      <RowWrapper>
        <div>Дата начала действия акта-допуска</div>
        <div>{openingDateText}</div>
      </RowWrapper>
      <RowWrapper>
        <div>Дата окончания действия акта-допуска</div>
        <div>{closingDateText}</div>
      </RowWrapper>
      <RowWrapper>
        <div>Диаметр</div>
        <div>{diameter || '-'}</div>
      </RowWrapper>
      <RowWrapper>
        <div>Дата поверки прибора</div>
        <div>{lastCheckingDateText}</div>
      </RowWrapper>
      <RowWrapper>
        <div>Дата следующей поверки прибора</div>
        <div>{futureCheckingDateText}</div>
      </RowWrapper>
    </Wrapper>
  );
};
