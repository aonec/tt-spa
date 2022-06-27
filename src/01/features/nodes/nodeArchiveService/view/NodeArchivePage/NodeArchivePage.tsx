import React, { FC } from 'react';
import { PageHeader } from '01/shared/ui/PageHeader';
import { NodeArchivePageProps } from './NodeArchivePage.types';
import { FiltersWrap, Wrap } from './NodeArchivePage.styled';
import { NodeInfo } from './components/NodeInfo/';
import { SearchNodeArchiveFiltersContainer } from '../../searchNodeArchiveFiltersService';
import { NodeArchiveContainer } from '../../displayNodeArchiveService';
import { GoBack } from 'ui-kit/shared_components/GoBack';

export const NodeArchivePage: FC<NodeArchivePageProps> = ({
  node,
  loading,
}) => {
  return (
    <>
      <GoBack />
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
