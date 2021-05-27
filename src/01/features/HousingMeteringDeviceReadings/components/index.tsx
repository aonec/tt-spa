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
import { YearReadingsType } from '../lib/groupReadingsByDates';

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
  const yearSortFn = (a: YearReadingsType, b: YearReadingsType) =>
    Number(b.year) - Number(a.year);
  const yearMapFn = (yearElement: YearReadingsType) => (
    <YearReading yearElement={yearElement} />
  );

  const readingsElems = readings?.sort(yearSortFn).map(yearMapFn);

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
