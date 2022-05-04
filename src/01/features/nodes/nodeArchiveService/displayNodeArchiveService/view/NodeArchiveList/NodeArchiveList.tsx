import React, { FC } from 'react';
import { Wrap, Header } from './NodeArchiveList.styled';
import { NodeArchiveListProps } from './NodeArchiveList.types';

export const NodeArchiveList: FC<NodeArchiveListProps> = ({
  data,
  loading,
}) => {
  return (
    <>
      <Wrap>
        <Header></Header>
      </Wrap>
    </>
  );
};
