import React, { FC, useMemo, useState } from 'react';
import _ from 'lodash';
import { CalculatorIcon, PureResourceIcon } from 'ui-kit/icons';
import { Segmented } from 'ui-kit/Segmented';
import {
  Header,
  NodesGroupsWrapper,
  Title,
  Wrapper,
} from './ResourceAccountingSystems.styled';
import {
  ResourceAccountingSystemsProps,
  ResourceAccountingSystemsSegment,
} from './ResourceAccountingSystems.types';
import { NO_CALCULATOR_KEY } from './ResourceAccountingSystems.constants';
import { NodesGroup } from './NodesGroup';
import { Empty, Skeleton } from 'antd';

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
              title: 'По вычислителю',
              icon: <CalculatorIcon />,
              name: 'calculator',
            },
          ]}
          active={segmentName}
          onChange={setSegmentName}
        />
      </Header>
      {isLoading && <Skeleton active />}
      {!isLoading && (
        <NodesGroupsWrapper>
          {!nodesGroups.length && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          {nodesGroups.length &&
            nodesGroups.map(([key, nodes]) => {
              return (
                <NodesGroup
                  nodes={nodes}
                  key={key}
                  groupKey={key}
                  segmentName={segmentName}
                />
              );
            })}
        </NodesGroupsWrapper>
      )}
    </Wrapper>
  );
};
