import styled from 'styled-components';
import { Skeleton } from 'antd';

export const FiltrationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

export const Circle = styled.div`
  height: 6px;
  width: 6px;
  box-sizing: content-box;

  border-radius: 4px;
  border: 1px solid white;
  background-color: #189ee9;
  z-index: 2;

  position: absolute;
  top: 5px;
  right: 4px;
`;

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;

  font-weight: 500;
  color: #272f5a;
`;

export const SkeletonSC = styled(Skeleton.Input)`
  margin-top: 4px;
  margin-left: 8px;
  height: 24px !important;
`;
