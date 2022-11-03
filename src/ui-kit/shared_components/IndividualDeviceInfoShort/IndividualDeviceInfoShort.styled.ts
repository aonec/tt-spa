import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  max-width: 250px;
`;

export const SerialNumber = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #272f5a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Model = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #272f5a88;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconWrapper = styled.div`
  min-width: 15px;
  display: flex;
  align-items: center;
`;
