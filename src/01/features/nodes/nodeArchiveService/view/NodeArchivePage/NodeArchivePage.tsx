import React, { FC } from 'react';
import { PageHeader } from '01/shared/ui/PageHeader';
import { NodeArchivePageProps } from './NodeArchivePage.types';
import { Wrap } from './NodeArchivePage.styled';
import { Breadcrumb } from '01/tt-components/Breadcrumb';
import { NodeInfo } from './NodeInfo/NodeInfo';

export const NodeArchivePage: FC<NodeArchivePageProps> = ({
  node,
  loading,
}) => {
  return (
    <>
      <Breadcrumb />
      <PageHeader title="Архив" />
      {node && <NodeInfo node={node} />}
      <Wrap></Wrap>
    </>
  );
};
