import { Skeleton } from 'antd';
import styled from 'styled-components';

export const DisablingResourceWrapperContainer = styled.div`
  max-width: 960px;
`;

export const TimeElement = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  color: #272f5a;
`;

export const StyledFontLarge = styled.span`
  font-weight: 500;
  margin-right: 5px;
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 0.8fr 0.8fr 1.2fr 1.5fr;
  gap: 10px;
  align-items: center;
  background-color: #f3f5f6;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
  padding: 10px 20px;
  height: 49px;
  margin-top: 16px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaginationWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding: 15px 0px;
`;

export const SkeletonSC = styled(Skeleton)`
  margin-top: 16px;
`;
