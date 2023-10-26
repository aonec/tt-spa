import { Skeleton } from 'antd';
import styled from 'styled-components';

export const SkeletonSC = styled(Skeleton)<{ maxWidth?: string }>`
  margin-top: 16px;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100%')};
`;
