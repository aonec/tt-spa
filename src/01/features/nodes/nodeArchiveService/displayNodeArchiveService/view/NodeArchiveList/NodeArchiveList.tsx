import React, { FC } from 'react';
import { SetFiltersToStart } from './components/SetFiltersToStart/SetFiltersToStart';
import { Wrap, Header, GradientLoader } from './NodeArchiveList.styled';
import { NodeArchiveListProps } from './NodeArchiveList.types';

export const NodeArchiveList: FC<NodeArchiveListProps> = ({
  data,
  loading,
}) => {
  return (
    <>
      <Wrap>
        {loading && <GradientLoader />}
        {!data && <SetFiltersToStart />}
        {data && <Header></Header>}
      </Wrap>
    </>
  );
};
