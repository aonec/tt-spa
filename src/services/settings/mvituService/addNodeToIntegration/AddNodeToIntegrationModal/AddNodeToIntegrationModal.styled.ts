import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NodePanel = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 2.5fr;
  gap: 16px;
`;

export const NodeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NodeNumber = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #272f5a;
`;

export const NodeAddress = styled.div`
  text-align: right;
  padding-right: 16px;
`;

export const BaseInfoTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #272f5a;
`;

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const ShowAllButton = styled.div``;
