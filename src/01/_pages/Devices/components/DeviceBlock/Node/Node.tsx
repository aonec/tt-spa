import React from 'react';
import { CommunicationPipeInterface } from '../../utils/groupDevicesByObjects';
import { Dates } from '../Dates';
import {
  DeviceLink,
  Diameter,
  SerialNumber,
  StockIconTT,
} from '../DeviceBlock';
import styled from 'styled-components';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { PipeNodeIntoCalculatorResponse } from '../../../../../../myApi';
import { Space } from '01/shared/ui/Layout/Space/Space';

const Node: React.FC<Props> = ({ node }) => {
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

          <Dates
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

  const { icon, color } = DeviceIcons[node.resource!];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div>
          <TitleWrapper>
            <DeviceLink to={`/nodes/${node.id}`}>
              <StockIconTT dark icon={icon} color={color} />
              <Space w={6} />
              <span>{`Узел ${node.number}`}</span>
            </DeviceLink>
            <ServiceZone>{node.nodeServiceZone?.name}</ServiceZone>
          </TitleWrapper>
        </div>

        <CommercialAct>
          <span>Акт-допуска </span>
          <Dates
            firstDate={node.lastCommercialAccountingDate}
            lastDate={node.futureCommercialAccountingDate}
          />
        </CommercialAct>
      </div>

      {housingDevices}
    </div>
  );
};

export const MeteringDeviceWrapper = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 3fr 1.5fr 2fr 1fr;
  margin-bottom: 24px;
  margin-left: 24px;
  align-items: center;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  margin-left: 24px;
  display: flex;
  align-items: center;
`;

const ServiceZone = styled.span`
  font-size: 16px;
  line-height: 2;
  color: var(--main-70);
`;

const CommercialAct = styled.div`
  font-size: 12px;
  color: var(--main-70);
  padding-left: 48px;
`;

interface Props {
  node: PipeNodeIntoCalculatorResponse;
}

export default Node;
