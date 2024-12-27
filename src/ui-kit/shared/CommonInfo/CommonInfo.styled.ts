import { Skeleton } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div<{ isLastUnderline: boolean }>`
  display: grid;
  grid-template-columns: 0.75fr 1fr;
  border-bottom: 1px solid #dcdee4;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  grid-gap: 15px;
  padding: 15px 0;

  &:last-child {
    border-bottom: ${({ isLastUnderline }) =>
      isLastUnderline ? '1px solid #dcdee4' : 'none'};
  }
`;

export const KeyWrapper = styled.div`
  color: rgba(39, 47, 90, 0.7);
  overflow: hidden;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const ValueWrapper = styled.div`
  color: rgba(39, 47, 90, 0.9);
`;

export const SkeletonLoader = styled(Skeleton.Input)`
  .ant-skeleton-input {
    width: 150px;
    border-radius: 4px;
    max-height: 16px;
  }
`;
