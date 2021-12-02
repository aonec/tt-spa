import { Loader } from '01/components';
import { Skeleton } from 'antd';
import React from 'react';
import { Flex } from '../Layout/Flex';

interface Props {
  loading: boolean;
  skeleton?: boolean;
}

export const PendingLoader: React.FC<Props> = ({
  children,
  loading,
  skeleton,
}) => {
  return (
    <>
      {loading ? (
        skeleton ? (
          <Skeleton active />
        ) : (
          <Flex style={{ justifyContent: 'center', marginTop: 25 }}>
            <Loader size={32} show />
          </Flex>
        )
      ) : (
        children
      )}
    </>
  );
};
