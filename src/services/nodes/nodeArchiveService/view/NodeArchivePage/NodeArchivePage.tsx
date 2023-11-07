import React, { FC } from 'react';
import { NodeArchivePageProps } from './NodeArchivePage.types';
import { PageHeaderSC, StickyWrapper, Wrap } from './NodeArchivePage.styled';
import { NodeInfo } from './components/NodeInfo/';
import { SearchNodeArchiveFiltersContainer } from '../../searchNodeArchiveFiltersService';
import { NodeArchiveContainer } from '../../displayNodeArchiveService';
import { GoBack } from 'ui-kit/shared/GoBack';

export const NodeArchivePage: FC<NodeArchivePageProps> = ({ node }) => {
  return (
    <>
      <StickyWrapper>
        <GoBack />
        <PageHeaderSC title="Архив" />
        <NodeInfo node={node} />
      </StickyWrapper>
      <Wrap>
        <NodeArchiveContainer />

        <SearchNodeArchiveFiltersContainer />
      </Wrap>
    </>
  );
};
