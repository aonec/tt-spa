import React, { FC, useMemo, useState } from 'react';
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
import { NodesGroup } from './NodesGroup';
import { Empty, Skeleton } from 'antd';
import { getNodesGroups } from './ResourceAccountingSystems.utils';

export const ResourceAccountingSystems: FC<ResourceAccountingSystemsProps> = ({
  nodes,
  isLoading,
  openDevicesListModal,
}) => {
  const [segmentName, setSegmentName] =
    useState<ResourceAccountingSystemsSegment>('resource');

  const nodesGroups = useMemo(
    () => getNodesGroups(nodes || [], segmentName),
    [nodes, segmentName],
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
      {!isLoading && (
        <NodesGroupsWrapper>
          {nodesGroups.length ? (
            nodesGroups.map(([key, nodes]) => {
              return (
                <NodesGroup
                  nodes={nodes}
                  key={key}
                  groupKey={key}
                  segmentName={segmentName}
                  openDevicesListModal={openDevicesListModal}
                />
              );
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </NodesGroupsWrapper>
      )}
    </Wrapper>
  );
};
