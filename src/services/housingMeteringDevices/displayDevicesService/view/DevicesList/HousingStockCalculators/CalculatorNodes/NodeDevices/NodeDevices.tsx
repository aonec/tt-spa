import React, { FC } from 'react';
import { NodeDevicesProps } from './NodeDevices.types';
import {
  CommercialAct,
  Diameter,
  MeteringDeviceWrapper,
  ServiceZone,
  TitleWrapper,
} from './NodeDevices.styled';
import { DeviceLink, SerialNumber } from '../CalculatorNodes.styled';
import { DateRange } from 'ui-kit/shared_components/DateRange';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

export const NodeDevices: FC<NodeDevicesProps> = ({ node }) => {
  const housingDevices = node.communicationPipes?.map((pipe) => {
    const devices = pipe.devices?.map((housingDevice) => {
      return (
        <MeteringDeviceWrapper key={housingDevice.id}>
          <div>
            <TitleWrapper>
              <DeviceLink to={`/housingMeteringDevices/${housingDevice.id}`}>
                {`${housingDevice.model} `}
                <SerialNumber>({housingDevice.serialNumber})</SerialNumber>
              </DeviceLink>
            </TitleWrapper>
          </div>

          <DateRange
            firstDate={housingDevice.lastCheckingDate}
            lastDate={housingDevice.futureCheckingDate}
          />

          <Diameter>
            {housingDevice.diameter ? housingDevice.diameter + ' мм' : ''}
          </Diameter>
        </MeteringDeviceWrapper>
      );
    });
    return devices;
  });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div>
          <TitleWrapper>
            <DeviceLink to={`/nodes/${node.id}`}>
              <ResourceIconLookup resource={node.resource} />
              <span>{`Узел ${node.number}`}</span>
            </DeviceLink>
            <ServiceZone>{node.nodeServiceZone?.name}</ServiceZone>
          </TitleWrapper>
        </div>

        <CommercialAct>
          <span>Акт-допуска </span>
          <DateRange
            firstDate={node.lastCommercialAccountingDate}
            lastDate={node.futureCommercialAccountingDate}
          />
        </CommercialAct>
      </div>

      {housingDevices}
    </div>
  );
};
