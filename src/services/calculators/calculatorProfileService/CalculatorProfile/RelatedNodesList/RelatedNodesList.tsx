import React, { FC } from 'react';
import { RelatedNodesListProps } from './RelatedNodesList.types';
import { NodeItem } from './NodeItem';
import { MeteringDevicesContainer } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/meteringDevicesService';

export const RelatedNodesList: FC<RelatedNodesListProps> = ({
  nodes,
  openDevicesListModal,
}) => {
  return (
    <>
      <MeteringDevicesContainer />
      {nodes?.map((node) => (
        <NodeItem
          node={node}
          openDevicesListModal={openDevicesListModal}
          key={node.id}
        />
      ))}
    </>
  );
};
