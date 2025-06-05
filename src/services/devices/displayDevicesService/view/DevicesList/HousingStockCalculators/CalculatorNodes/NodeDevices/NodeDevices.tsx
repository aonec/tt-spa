import React, { FC } from 'react';
import { NodeDevicesProps } from './NodeDevices.types';
import {
  CommercialAct,
  Diameter,
  NodeTitleWrapper,
  IncorrectConfigurationIconSC,
  MeteringDeviceWrapper,
  NodeDevicesWrapper,
  ResourceIconWrapper,
  ServiceZone,
  TitleWrapper,
} from './NodeDevices.styled';
import { DeviceLink, SerialNumber } from '../CalculatorNodes.styled';
import { DateRange } from 'ui-kit/shared/DateRange';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';

export const NodeDevices: FC<NodeDevicesProps> = ({ node }) => {
  const housingMeteringDevices = node.communicationPipes?.map((pipe) => {
    const devices = pipe.devices?.map((housingDevice) => {
      return (
        <MeteringDeviceWrapper key={housingDevice.id}>
          <TitleWrapper>
            <DeviceLink
              to={`/housingMeteringDevices/${housingDevice.id}/profile`}
            >
              {`${housingDevice.model} `}
              <SerialNumber>({housingDevice.serialNumber})</SerialNumber>
            </DeviceLink>
          </TitleWrapper>

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

  const isIncorrectConfig =
    (node?.validationResult?.errors || []).length !== 0 ||
    (node?.validationResult?.warnings || []).length !== 0;

  return (
    <>
      <NodeDevicesWrapper>
        <TitleWrapper>
          <DeviceLink to={`/nodes/${node.id}`}>
            <ResourceIconWrapper>
              <ResourceIconLookup resource={node.resource} />
            </ResourceIconWrapper>

            <NodeTitleWrapper>
              <span> {node.nodeServiceZone?.name}</span>
              {isIncorrectConfig && <IncorrectConfigurationIconSC />}
            </NodeTitleWrapper>
          </DeviceLink>
          <ServiceZone>{`Узел ${node.title}`}</ServiceZone>
        </TitleWrapper>

        <CommercialAct>
          <span>Акт-допуска </span>
          <DateRange
            firstDate={node.lastCommercialAccountingDate}
            lastDate={node.futureCommercialAccountingDate}
          />
        </CommercialAct>
      </NodeDevicesWrapper>

      {housingMeteringDevices}
    </>
  );
};
