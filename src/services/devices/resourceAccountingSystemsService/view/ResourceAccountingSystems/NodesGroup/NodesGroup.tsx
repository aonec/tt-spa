import React, { FC, useState } from 'react';
import { ResourceAccountingSystemsSegment } from '../ResourceAccountingSystems.types';
import {
  ChevronSC,
  ChevronWrapper,
  GroupAmountText,
  GroupInfoWrapper,
  GroupTitle,
  Header,
  NoCalculatorTitle,
  Wrapper,
} from './NodesGroup.styled';
import { NodesGroupProps } from './NodesGroup.types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { EResourceType } from 'api/types';
import { getSystemText } from './NodesGroup.utils';
import { NodeItem } from './NodeItem';
import { CalculatorInfo } from './CalculatorInfo';
import { ResourceNamesDictionary } from 'dictionaries';

export const NodesGroup: FC<NodesGroupProps> = ({
  nodes,
  groupKey,
  segmentName,
  openDevicesListModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const groupInfos: {
    [key in ResourceAccountingSystemsSegment]: FC;
  } = {
    resource: () => (
      <GroupInfoWrapper>
        <ResourceIconLookup resource={groupKey as EResourceType} />

        <GroupTitle>
          {ResourceNamesDictionary[groupKey as EResourceType]}
        </GroupTitle>
      </GroupInfoWrapper>
    ),
    calculator: () => {
      const calculator = nodes[0]?.networkDevice;

      if (!calculator) {
        return <NoCalculatorTitle>Нет вычислителя</NoCalculatorTitle>;
      }

      return (
        <GroupInfoWrapper>
          <CalculatorInfo calculator={calculator} />
        </GroupInfoWrapper>
      );
    },
  };

  const GroupInfo = groupInfos[segmentName];

  const systemText = getSystemText(nodes.length);

  const sortedNodes = nodes.sort(
    (a, b) =>
      Number(a.networkDevice?.serialNumber) -
      Number(b.networkDevice?.serialNumber),
  );

  return (
    <Wrapper>
      <Header onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <GroupInfo />
        <GroupInfoWrapper>
          <GroupAmountText>
            {nodes.length} {systemText} учета
          </GroupAmountText>
          <ChevronWrapper>
            <ChevronSC isOpen={isOpen} />
          </ChevronWrapper>
        </GroupInfoWrapper>
      </Header>
      {isOpen && (
        <>
          {sortedNodes.map((node) => (
            <NodeItem
              key={node.id}
              node={node}
              segmentName={segmentName}
              openDevicesListModal={openDevicesListModal}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
};
