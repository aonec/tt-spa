import React, { FC } from 'react';
import {
  ColumnTitle,
  NodeNumber,
  Plate,
  PlatesContainer,
  TitleContainer,
} from './NodesInfo.styled';
import { NodesInfoProps } from './NodesInfo.types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';

export const NodesInfo: FC<NodesInfoProps> = ({ nodesTinyData }) => {
  return (
    <>
      <TitleContainer>
        <ColumnTitle>Узел :</ColumnTitle>
        <ColumnTitle>Номер ввода :</ColumnTitle>
      </TitleContainer>

      <PlatesContainer>
        {nodesTinyData.map((node) => (
          <React.Fragment key={node.id}>
            <Plate>
              {node.resource && <ResourceIconLookup resource={node.resource} />}
              <NodeNumber>Узел {node.title}</NodeNumber>
            </Plate>
            <Plate>{node.entryNumber}</Plate>
          </React.Fragment>
        ))}
      </PlatesContainer>
    </>
  );
};
