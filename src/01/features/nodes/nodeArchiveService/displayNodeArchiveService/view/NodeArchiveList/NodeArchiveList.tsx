import React, { FC } from 'react';
import { ArchiveRow } from './components/ArchiveRow';
import { SetFiltersToStart } from './components/SetFiltersToStart/SetFiltersToStart';
import { Wrap, Header, GradientLoader, Column } from './NodeArchiveList.styled';
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
        {data && (
          <>
            <Header>
              {data.columns.map((column) => (
                <Column>{column.text}</Column>
              ))}
            </Header>
            {data.rows.map((row) => (
              <ArchiveRow row={row} />
            ))}
          </>
        )}
      </Wrap>
    </>
  );
};
