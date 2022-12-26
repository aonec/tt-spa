import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;

  align-items: center;
  grid-template-columns: 2fr 1fr 2fr;
  width: 100%;

  padding: 16px;
  border-bottom: 1px solid #dcdee4;
`;

export const DeviceLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #272f5ab2;
`;

export const DeviceModelText = styled.div`
  font-weight: 500;
  color: #272f5a;
`;

export const DeviceInformation = styled.div`
  color: #272f5ab2;
  display: flex;
  align-items: center;
  gap: 16px;
`;
