import React, { FC } from 'react';
import { PageHeader } from '01/shared/ui/PageHeader';
import { NodeArchivePageProps } from './NodeArchivePage.types';
import { FiltersWrap, Wrap } from './NodeArchivePage.styled';
import { Breadcrumb } from '01/tt-components/Breadcrumb';
import { NodeInfo } from './components/NodeInfo/';
import { SearchNodeArchiveFiltersContainer } from '../../searchNodeArchiveFiltersService';
import { NodeArchiveContainer } from '../../displayNodeArchiveService';

export const NodeArchivePage: FC<NodeArchivePageProps> = ({
  node,
  loading,
}) => {
  return (
    <>
      <Breadcrumb />
      <PageHeader title="Архив" />
      <NodeInfo node={node} loading={loading} />
      <Wrap>
        <NodeArchiveContainer />
        <FiltersWrap>
          <SearchNodeArchiveFiltersContainer />
        </FiltersWrap>
      </Wrap>
    </>
  );
};
