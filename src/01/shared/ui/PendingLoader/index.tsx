import { Loader } from '01/components';
import React from 'react';
import { Flex } from '../Layout/Flex';

interface Props {
  loading: boolean;
}

export const PendingLoader: React.FC<Props> = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <Flex style={{ justifyContent: 'center', marginTop: 25 }}>
          <Loader size={32} show />
        </Flex>
      ) : (
        children
      )}
    </>
  );
};
