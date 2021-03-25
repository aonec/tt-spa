import React from 'react';
import { CommunicationPipeInterface } from '../../utils/groupDevicesByObjects';
import { Dates } from '../Dates';
import { DeviceLink, Diameter, SerialNumber } from '../DeviceBlock';
import styled from 'styled-components';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import Icon from '../../../../../tt-components/Icon';
import { NodeResponse } from '../../../../../../myApi';

const Node: React.FC<Props> = ({ node }) => {
  const housingDevices = node.communicationPipes?.map((pipe) => {
    const devices = pipe.devices?.map((housingDevice) => {
      return (
        <MeteringDeviceWrapper>
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
              <NodeIcon icon={icon} color={color} />
              <span>{`Узел ${node.number}`}</span>
            </DeviceLink>
            <ServiceZone>{node.serviceZone}</ServiceZone>
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

const NodeIcon = styled(Icon)`
  margin-right: 8px;
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
interface NodeInterface {
  calculatorId: number | null;
  communicationPipes: CommunicationPipeInterface[];
  futureCommercialAccountingDate: string;
  id: number;
  lastCommercialAccountingDate: string;
  nodeStatus: string;
  number: number;
  resource: string;
  serviceZone: string;
}

interface Props {
  node: NodeResponse;
}

export default Node;
