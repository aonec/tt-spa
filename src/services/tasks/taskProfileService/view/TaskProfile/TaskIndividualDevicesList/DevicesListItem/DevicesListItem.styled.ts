import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;

  border-bottom: 1px solid var(--frame);
`;

export const DeviceSerialNumberText = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: #272f5a;
`;

export const DeviceModelText = styled.div`
  color: #272f5ab2;
  margin-left: 4px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkSC = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #272f5a;
`;
