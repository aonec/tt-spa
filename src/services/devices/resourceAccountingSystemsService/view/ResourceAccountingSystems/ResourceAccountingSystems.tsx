import React, { FC, useState } from 'react';
import { CalculatorIcon, PureResourceIcon } from 'ui-kit/icons';
import { Segmented } from 'ui-kit/Segmented';
import { Header, Title, Wrapper } from './ResourceAccountingSystems.styled';
import {
  ResourceAccountingSystemsProps,
  ResourceAccountingSystemsSegment,
} from './ResourceAccountingSystems.types';

export const ResourceAccountingSystems: FC<ResourceAccountingSystemsProps> = ({}) => {
  const [
    segmentName,
    setSegmentName,
  ] = useState<ResourceAccountingSystemsSegment>('resource');

  return (
    <Wrapper>
      <Header>
        <Title>Системы учета ресурсов</Title>
        <Segmented<ResourceAccountingSystemsSegment>
          items={[
            {
              title: 'По ресурсу',
              icon: <PureResourceIcon />,
              name: 'resource',
            },
            {
              title: 'По вычислителю',
              icon: <CalculatorIcon />,
              name: 'calculator',
            },
          ]}
          active={segmentName}
          onChange={setSegmentName}
        />
      </Header>
    </Wrapper>
  );
};
