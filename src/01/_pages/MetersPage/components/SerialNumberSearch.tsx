import axios from '01/axios';
import { Loader } from '01/components';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { StyledAutocomplete } from '01/shared/ui/Fields';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { CancelTokenSource } from 'axios';
import { IndividualDeviceListItemResponse } from 'myApi';
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  setSearchContext: (context: 1 | 2) => void;
}

export const SerialNumberSearch: React.FC<Props> = ({ setSearchContext }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [devices, setDevices] = useState<IndividualDeviceListItemResponse[]>();
  const [loading, setLoading] = useState(false);
  const [
    cancelTokenSource,
    setCancelTokenSource,
  ] = useState<CancelTokenSource | null>(null);

  async function fetchDevices() {
    if (!serialNumber) return;

    if (cancelTokenSource) {
      cancelTokenSource.cancel();
      setCancelTokenSource(null);
    }

    setLoading(true);

    try {
      const newCancelToken = axios.CancelToken.source();
      setCancelTokenSource(newCancelToken);
      const res: {
        items: IndividualDeviceListItemResponse[];
      } = await axios.get('IndividualDevices', {
        params: { serialNumber },
        cancelToken: newCancelToken?.token,
      });

      setDevices(res.items);
    } catch (error) {}
    setLoading(false);
  }

  const onKeyDownHandler = (e: any) => {
    if (e?.key === 'Enter') fetchDevices();
  };

  const renderDevice = (
    device: IndividualDeviceListItemResponse,
    index: number
  ) => (
    <NavLink
      to={`/meters/apartments/${device.apartmentId}`}
      onClick={() => setSearchContext(1)}
    >
      <Device key={index}>
        <DeviceDataString device={device} />
      </Device>
    </NavLink>
  );

  return (
    <>
      <StyledAutocomplete
        value={serialNumber}
        onChange={setSerialNumber}
        placeholder="Серийный номер прибора"
        onKeyDown={onKeyDownHandler}
      />

      <Space />

      {loading ? (
        <Flex style={{ justifyContent: 'center' }}>
          <Loader show size={32} />
        </Flex>
      ) : (
        devices?.map(renderDevice)
      )}
      <Space />
    </>
  );
};

const Device = styled.div`
  padding: 15px;
  cursor: pointer;
  z-index: 0;
  transition: 0.2s;
  border-radius: 10px;
  border: 1px solid rgba(24, 158, 233, 0);

  &:hover {
    border: 1px solid rgba(24, 158, 233, 0.3);
    background: rgba(24, 158, 233, 0.07);
    z-index: 1;

    * {
      color: #000000e1;
    }
  }
`;
