import React, { FC, useMemo, useState } from 'react';
import _ from 'lodash';
import { CalculatorIcon, PureResourceIcon } from 'ui-kit/icons';
import { Segmented } from 'ui-kit/Segmented';
import { Header, Title, Wrapper } from './ResourceAccountingSystems.styled';
import {
  ResourceAccountingSystemsProps,
  ResourceAccountingSystemsSegment,
} from './ResourceAccountingSystems.types';
import { NO_CALCULATOR_KEY } from './ResourceAccountingSystems.constants';
import { Skeleton } from 'antd';

export const ResourceAccountingSystems: FC<ResourceAccountingSystemsProps> = ({
  nodes,
  isLoading,
}) => {
  const [
    segmentName,
    setSegmentName,
  ] = useState<ResourceAccountingSystemsSegment>('resource');

  const nodesGroups = useMemo(
    () =>
      Object.entries(
        _.groupBy(nodes, (node) =>
          segmentName === 'resource'
            ? node.resource
            : node.networkDevice?.id || NO_CALCULATOR_KEY
        )
      ),
    [nodes, segmentName]
  );

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
              title: 'По точке опроса',
              icon: <CalculatorIcon />,
              name: 'calculator',
            },
          ]}
          active={segmentName}
          onChange={setSegmentName}
        />
      </Header>
      {isLoading && <Skeleton active />}
    </Wrapper>
  );
};
