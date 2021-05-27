import React from 'react';
import { useStore } from 'effector-react';
import {
  $postReadingsErrorMessage,
  $readingsToDisplay,
  $requestReadingsErrorMessage,
  HousingMeteringDeviceReadingsGate,
  ResourceGate,
} from '../models';
import { EResourceType } from '../../../../myApi';
import { Alert } from 'antd';
import { HousingMeteringReadingsHeader } from './HousingMeteringReadingsHeader';
import { YearReading } from './YearReading';

const HousingMeteringDeviceReadings = ({
  nodeId,
  resource,
}: {
  nodeId: number;
  resource: EResourceType;
}) => {
  const readings = useStore($readingsToDisplay);
  const postReadingsErrorMessage = useStore($postReadingsErrorMessage);
  const requestReadingsErrorMessage = useStore($requestReadingsErrorMessage);

  const readingsElems = readings
    ?.sort((a, b) => Number(b.year) - Number(a.year))
    .map((yearElement) => <YearReading yearElement={yearElement} />);

  const renderAddReadingsAlert = () =>
    postReadingsErrorMessage ? (
      <Alert
        message="Ошибка"
        description="Не удалось добавить показания по прибору. Пожалуйста, обновите страницу или повторите попытку позже."
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
    ) : null;

  const renderRequestReadingsAlert = () => {
    return requestReadingsErrorMessage ? (
      <Alert
        message="Ошибка"
        description="Не удалось получить показания по узлу. Пожалуйста, обновите страницу или повторите попытку позже."
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
    ) : null;
  };

  return (
    <div>
      <ResourceGate resource={resource} />
      {renderAddReadingsAlert()}
      {renderRequestReadingsAlert()}
      <HousingMeteringDeviceReadingsGate nodeId={nodeId} />
      <HousingMeteringReadingsHeader resource={resource} />
      {readingsElems}
    </div>
  );
};

export default HousingMeteringDeviceReadings;
