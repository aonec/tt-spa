import { Skeleton } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Panel = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 4px;
  background: #f3f5f6;
  padding: 8px 12px;
  gap: 5px;
`;

export const Title = styled.span`
  color: #272f5a;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

export const Count = styled.span`
  color: #272f5a;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`;

export const SkeletonSC = styled(Skeleton.Button)`
  .ant-skeleton-button {
    height: 16px !important;
  }
`;
