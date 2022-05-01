import React from 'react';
import { Skeleton } from 'antd';
import { Wrap } from './LoadingSkeleton.styled';

export const LoadingSkeleton = () => {
  return (
    <Wrap>
      <Skeleton.Input active style={{ width: 70 }} size="small" />
      <Skeleton.Input
        active
        style={{ marginLeft: 10, width: 60 }}
        size="small"
      />
      <Skeleton.Avatar active style={{ marginLeft: 10 }} size="small" />
      <Skeleton.Input
        active
        style={{ marginLeft: 10, width: 50 }}
        size="small"
      />
    </Wrap>
  );
};
