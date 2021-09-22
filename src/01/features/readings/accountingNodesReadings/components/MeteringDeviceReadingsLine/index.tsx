import { Icon } from '01/shared/ui/Icon';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ElectricNodeResponse } from 'myApi';
import React from 'react';
import styled from 'styled-components';
import { gridTemp } from '../MeteringDevicesList';

interface Props {
  node: ElectricNodeResponse;
}

export const MeteringDeviceReadingsLine: React.FC<Props> = ({ node }) => {
  const counter = node.counter;

  const deviceData = (
    <Flex>
      <IconWrap>
        <Icon name={node.counter?.resource!} />
      </IconWrap>
      <Space w={11} />
      <div>
        <div>
          <b>{counter?.serialNumber}</b>
        </div>
        <div>{counter?.model}</div>
      </div>
    </Flex>
  );

  return (
    <Wrap temp={gridTemp}>
      {deviceData}
      <Center>{counter?.scaleFactor}</Center>
    </Wrap>
  );
};

const Wrap = styled(Grid)`
  padding: 25px 15px;
  border-bottom: 1px solid #dcdee4;
`;

const Center = styled(Flex)`
  justify-content: center;
`;

const IconWrap = styled.div`
  transform: translateY(-10px);
`;

const a = {
  locationName: '50 Лет Октября, 11, п. 1 п. в подв. ',
  counter: {
    installationDate: null,
    manufactureYear: 0,
    stateVerificationYear: 2017,
    stateVerificationQuarter: 'Third',
    stateVerificationIntervalYears: 16,
    nextStateVerificationYear: 2033,
    phaseNumber: 'ThreePhase',
    nodeId: 19765383,
    resource: 'Electricity',
    housingMeteringDeviceType: 'Counter',
    address: {
      id: 500,
      corpus: null,
      city: 'Нижнекамск',
      street: '50 лет Октября',
      housingStockNumber: '11',
    },
    measuringUnit: 'KiloWatt',
    minReadingsValue: null,
    maxReadingsValue: null,
    comment: null,
    id: 19763132,
    transactionType: null,
    model: 'Меркурий 230-AR-03-RN',
    serialNumber: '32352740',
    sealNumber: null,
    sealInstallationDate: null,
    lastCommercialAccountingDate: null,
    futureCommercialAccountingDate: null,
    lastCheckingDate: '2017-09-19T03:00:00',
    futureCheckingDate: '2033-01-01T03:00:00',
    closingDate: null,
    closingReason: 'None',
    isActive: false,
    bitDepth: 6,
    scaleFactor: 30,
    checkingNumber: 0,
  },
  currentTransformers: [
    {
      id: 'be8085ff-8a93-42b1-a715-33a552968344',
      installationDate: null,
      manufactureYear: 2017,
      lastCheckingDate: '2017-04-01T00:00:00',
      futureCheckingDate: '2025-01-01T00:00:00',
      stateVerificationYear: 2017,
      stateVerificationQuarter: 'Second',
      nextStateVerificationYear: 2025,
      stateVerificationIntervalYears: 8,
      typeName: 'TОП-0,66УЗ',
      phase: 'C',
      number: '7088131',
      primaryCurrentRatingAmperes: 150,
      secondaryCurrentRatingAmperes: 5,
      coefficient: 30,
      lastCommercialAccountingDate: null,
      futureCommercialAccountingDate: null,
      sealNumber: null,
      sealInstallationDate: null,
      closingDate: null,
      nodeId: 19765383,
    },
    {
      id: 'eecea90f-cfb9-40f5-a683-2763acab929d',
      installationDate: null,
      manufactureYear: 2017,
      lastCheckingDate: '2017-04-01T00:00:00',
      futureCheckingDate: '2025-01-01T00:00:00',
      stateVerificationYear: 2017,
      stateVerificationQuarter: 'Second',
      nextStateVerificationYear: 2025,
      stateVerificationIntervalYears: 8,
      typeName: 'TОП-0,66УЗ',
      phase: 'A',
      number: '7088129',
      primaryCurrentRatingAmperes: 150,
      secondaryCurrentRatingAmperes: 5,
      coefficient: 30,
      lastCommercialAccountingDate: null,
      futureCommercialAccountingDate: null,
      sealNumber: null,
      sealInstallationDate: null,
      closingDate: null,
      nodeId: 19765383,
    },
    {
      id: 'f8eb018c-9954-4c16-83cb-7a0248bc369c',
      installationDate: null,
      manufactureYear: 2017,
      lastCheckingDate: '2017-04-01T00:00:00',
      futureCheckingDate: '2025-01-01T00:00:00',
      stateVerificationYear: 2017,
      stateVerificationQuarter: 'Second',
      nextStateVerificationYear: 2025,
      stateVerificationIntervalYears: 8,
      typeName: 'TОП-0,66УЗ',
      phase: 'B',
      number: '7088130',
      primaryCurrentRatingAmperes: 150,
      secondaryCurrentRatingAmperes: 5,
      coefficient: 30,
      lastCommercialAccountingDate: null,
      futureCommercialAccountingDate: null,
      sealNumber: null,
      sealInstallationDate: null,
      closingDate: null,
      nodeId: 19765383,
    },
  ],
  id: 19765383,
  number: 1,
  nodeStatus: { value: 'Registered', description: 'Сдан на коммерческий учет' },
  resource: 'Electricity',
  nodeServiceZone: null,
  lastCommercialAccountingDate: null,
  futureCommercialAccountingDate: null,
  housingStockId: 500,
  address: {
    id: 500,
    corpus: null,
    city: 'Нижнекамск',
    street: '50 лет Октября',
    housingStockNumber: '11',
  },
  documents: [],
};
