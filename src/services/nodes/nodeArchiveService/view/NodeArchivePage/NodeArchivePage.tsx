import React, { FC } from 'react';
import { NodeArchivePageProps } from './NodeArchivePage.types';
import { FiltersWrap, PageHeaderSC, Wrap } from './NodeArchivePage.styled';
import { NodeInfo } from './components/NodeInfo/';
import { SearchNodeArchiveFiltersContainer } from '../../searchNodeArchiveFiltersService';
import { NodeArchiveContainer } from '../../displayNodeArchiveService';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

export const NodeArchivePage: FC<NodeArchivePageProps> = ({
  node,
  loading,
}) => {
  return (
    <WithLoader isLoading={loading}>
      <GoBack />
      <PageHeaderSC title="Архив" />
      <NodeInfo node={node} />
      <Wrap>
        <NodeArchiveContainer />
        <FiltersWrap>
          <SearchNodeArchiveFiltersContainer />
        </FiltersWrap>
      </Wrap>
    </WithLoader>
  );
};
