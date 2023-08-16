import React, { FC } from 'react';
import { TemperatureGraphProps } from './TemperatureGraph.types';
import { Table } from '../../../../../ui-kit/Table/Table';
import {
  PageWrapper,
  WrapperMultiHeader,
  WrapperT3,
  WrapperTime,
  WrapperUnderscore,
} from './TemperatureGraph.styled';
import { CriticalTemperaturePanel } from '../criticalTemperatureDeviationService/view/CriticalTemperaturePanel';

export const TemperatureGraph: FC<TemperatureGraphProps> = ({
  temperatureNormative,
}) => {
  return (
    <PageWrapper>
      <CriticalTemperaturePanel />
      <Table
        columns={[
          {
            label: 'Т наружного воздуха',
            size: '190px',
            render: (data) => data.outdoorTemperature,
          },
          {
            label: (
              <WrapperMultiHeader>
                <WrapperUnderscore>
                  Температура в подающем трубопроводе, t<sub>1</sub>
                </WrapperUnderscore>

                <WrapperTime>
                  <div>День</div>
                  <div>Ночь</div>
                </WrapperTime>
              </WrapperMultiHeader>
            ),
            size: '280px',
            render: (data) => (
              <WrapperTime>
                <div>{data.dayFeedFlowTemperature}</div>
                <div>{data.nightFeedFlowTemperature}</div>
              </WrapperTime>
            ),
          },
          {
            label: (
              <WrapperT3>
                Т подающая в системе отопления, t<sub>3</sub>
              </WrapperT3>
            ),
            size: '160px',
            render: (data) => data.heatFeedFlowTemperature,
          },

          {
            label: (
              <WrapperMultiHeader>
                <WrapperUnderscore>
                  Температура в обратном трубопроводе, t<sub>2</sub>
                </WrapperUnderscore>

                <WrapperTime>
                  <div>День</div>
                  <div>Ночь</div>
                </WrapperTime>
              </WrapperMultiHeader>
            ),
            size: '280px',
            render: (data) => (
              <WrapperTime>
                <div>{data.dayFeedBackFlowTemperature}</div>
                <div>{data.nightFeedBackFlowTemperature}</div>
              </WrapperTime>
            ),
          },
        ]}
        elements={temperatureNormative}
      />
    </PageWrapper>
  );
};
