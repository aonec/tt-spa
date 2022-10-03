import React, { FC, useState } from 'react';
import { ResourceAccountingSystemsSegment } from '../ResourceAccountingSystems.types';
import {
  ChevronSC,
  ChevronWrapper,
  GroupAmountText,
  GroupInfoWrapper,
  GroupTitle,
  Header,
  Wrapper,
} from './NodesGroup.styled';
import { NodesGroupProps } from './NodesGroup.types';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { EResourceType } from 'myApi';
import { ResourceNamesDictionary } from './NodesGroup.constants';
import { getSystemText } from './NodesGroup.utils';
import { NodeItem } from './NodeItem';
import { CalculatorInfo } from './CalculatorInfo';

export const NodesGroup: FC<NodesGroupProps> = ({
  nodes,
  groupKey,
  segmentName,
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

      if (!calculator) return <div>Нет вычислителя</div>;

      return <CalculatorInfo calculator={calculator} />;
    },
  };

  const GroupInfo = groupInfos[segmentName];

  const nodesLength = nodes.length;

  const systemText = getSystemText(nodesLength);

  return (
    <Wrapper>
      <Header>
        <GroupInfo />
        <GroupInfoWrapper>
          <GroupAmountText>
            {nodesLength} {systemText} учета
          </GroupAmountText>
          <ChevronWrapper onClick={() => setIsOpen((isOpen) => !isOpen)}>
            <ChevronSC isOpen={isOpen} />
          </ChevronWrapper>
        </GroupInfoWrapper>
      </Header>
      {isOpen && (
        <div>
          {nodes.map((node) => (
            <NodeItem node={node} segmentName={segmentName} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
