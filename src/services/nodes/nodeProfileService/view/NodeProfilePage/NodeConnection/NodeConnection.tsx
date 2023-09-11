import React, { FC } from 'react';
import {
  DatesWrapper,
  LinkSC,
  ModelWrapper,
  PencilIconSC,
  SerialWrapper,
  TrashIconSC,
  Wrapper,
} from './NodeConnection.styled';
import { NodeConnectionProps } from './NodeConnection.types';
import dayjs from 'api/dayjs';
import { CalculatorIcon } from 'ui-kit/icons';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';

export const NodeConnection: FC<NodeConnectionProps> = ({
  node,
  onEdit,
  onRemoveConnection,
}) => {
  if (!node.calculator) {
    return null;
  }

  const {
    model,
    id,
    serialNumber,
    lastCheckingDate,
    futureCheckingDate,
    closingDate,
  } = node.calculator;

  const lastCheckingDateText = lastCheckingDate
    ? dayjs(lastCheckingDate).format('DD.MM.YYYY')
    : 'Дата поверки не указана';

  const futureCheckingDateText = futureCheckingDate
    ? dayjs(futureCheckingDate).format('DD.MM.YYYY')
    : 'Следующая Дата поверки не указана';

  return (
    <Wrapper>
      <LinkSC to={`/calculators/${id}`}>
        <CalculatorIcon />
        <ModelWrapper>{model}</ModelWrapper>
        <SerialWrapper>({serialNumber})</SerialWrapper>
      </LinkSC>
      <DeviceStatus isActive={!closingDate} />

      <DatesWrapper>{`${lastCheckingDateText} - ${futureCheckingDateText}`}</DatesWrapper>

      <div>
        {onEdit && <PencilIconSC onClick={onEdit} />}
        {onRemoveConnection && <TrashIconSC onClick={onRemoveConnection} />}
      </div>
    </Wrapper>
  );
};
