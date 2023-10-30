import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Skeleton } from 'antd';

export const LinkSC = styled(Link)`
  font-weight: 500;
  color: #272f5a;
`;

export const SkeletonLoader = styled(Skeleton.Input)`
  .ant-skeleton-input {
    width: 150px;
    border-radius: 4px;
    max-height: 16px;
  }
`;
