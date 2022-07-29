import moment from 'moment';
import React from 'react';
import { useEffect, useState } from 'react';
import { updateHousingMeteringDeviceReading } from '../../../../../_api/meteringDeviceReadings';
import { fromEnter } from '../../../../housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { RequestStatusShared } from '../../../displayReadingHistory/hooks/useReadingValues';
import { StyledMeteringDeviceReadingInput } from '../MeteringDeviceReadingInput';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

interface Props {
  reading: MeteringDeviceReading;
  refetch(): void;
  deviceId: number;
}

export const ConsumptionInput: React.FC<Props> = ({
  reading,
  refetch,
  deviceId,
}) => {
  const [value, setValue] = useState(reading.nonResidentialRoomConsumption);
  const [status, setStatus] = useState<RequestStatusShared>();

  useEffect(() => setValue(reading.nonResidentialRoomConsumption), [
    reading.nonResidentialRoomConsumption,
  ]);

  async function saveConsumption() {
    setStatus('pending');
    try {
      if (!reading.id) throw 'none id';

      await updateHousingMeteringDeviceReading({
        id: reading.id,
        nonResidentialRoomConsumption: Number(value),
      });

      refetch();

      setStatus('done');
    } catch (error) {
      setStatus('failed');
    }
  }

  return (
    <StyledMeteringDeviceReadingInput
      onKeyDown={fromEnter(saveConsumption)}
      onFocus={(e: any) => e.target.select()}
      status={status}
      color="#c3c3c3"
      value={value || ''}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
};
