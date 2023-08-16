import React, { FC } from 'react';
import { TemperatureGraphProps } from './TemperatureGraph.types';
import { Table } from '../../../../../ui-kit/Table/Table';
import {
  WrapperMultiHeader,
  WrapperT3,
  WrapperTime,
  WrapperUnderscore,
} from './TemperatureGraph.styled';

export const TemperatureGraph: FC<TemperatureGraphProps> = ({}) => {
  return (
    <Table
      columns={[
        {
          label: 'Т наружного воздуха',
          size: '210px',
          render: (elem) => {},
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
          size: '300px',
          render: (elem) => {},
        },
        {
          label: (
            <WrapperT3>
              Т подающая в системе отопления, t<sub>3</sub>
            </WrapperT3>
          ),
          size: '180px',
          render: (elem) => {},
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
          size: '300px',
          render: (elem) => {},
        },
      ]}
      elements={[]}
    />
  );
};
