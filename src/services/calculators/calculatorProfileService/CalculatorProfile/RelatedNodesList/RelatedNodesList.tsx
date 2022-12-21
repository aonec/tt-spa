import React, { FC } from 'react';
import { RelatedNodesListProps } from './RelatedNodesList.types';
import { RelatedNodesListItem } from './RelatedNodesListItem';

export const RelatedNodesList: FC<RelatedNodesListProps> = ({ nodes }) => {
  const list = nodes.map((node) => <RelatedNodesListItem node={node} />);

  return <>{list}</>;
};
