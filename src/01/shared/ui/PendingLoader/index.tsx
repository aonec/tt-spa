import { Loader } from '01/components';
import React from 'react';

interface Props {
  loading: boolean;
}

export const PendingLoader: React.FC<Props> = ({ children, loading }) => {
  return <>{loading ? <Loader show={true} /> : children}</>;
};
