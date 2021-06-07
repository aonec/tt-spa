import React from 'react';
import { useStore } from 'effector-react';
import {
  $postReadingsErrorMessage,
  $readingsToDisplay,
  $requestReadingsErrorMessage,
  HousingMeteringDeviceReadingsGate,
  requestReadingsFx,
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
  const isLoading = useStore(requestReadingsFx.pending);

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

  console.log(nodeId);

  return (
    <div>
      <ResourceGate resource={resource} />
      {renderAddReadingsAlert()}
      {renderRequestReadingsAlert()}
      {nodeId ? <HousingMeteringDeviceReadingsGate nodeId={nodeId} /> : null}
      <HousingMeteringReadingsHeader />
      {!requestReadingsErrorMessage && !isLoading ? readingsElems : null}
    </div>
  );
};

export default HousingMeteringDeviceReadings;
