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
import { NodeItem } from './NodeItem';
import { CalculatorInfo } from './CalculatorInfo';

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
        <div>
          {nodes.map((node) => (
            <NodeItem
              node={node}
              segmentName={segmentName}
              openDevicesListModal={openDevicesListModal}
              key={node.id}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
