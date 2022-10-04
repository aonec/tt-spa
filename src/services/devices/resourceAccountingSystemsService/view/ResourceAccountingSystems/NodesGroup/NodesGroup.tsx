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
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { EResourceType } from 'myApi';
import { ResourceNamesDictionary } from './NodesGroup.constants';
import { getSystemText } from './NodesGroup.utils';

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

      if (!calculator) {
        return <NoCalculatorTitle>Нет вычислителя</NoCalculatorTitle>;
      }

      return null;
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
    </Wrapper>
  );
};
