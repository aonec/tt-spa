import styled from 'styled-components';
import { deviceSealLineGridTemplate } from '../IndividualDevicesList.styled';

export const Wrapper = styled.div<{ isDeviceClosed?: boolean }>`
  padding: 24px 0 24px 10px;
  display: grid;
  grid-template-columns: ${deviceSealLineGridTemplate};
  grid-gap: 15px;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  opacity: ${({ isDeviceClosed }) => (isDeviceClosed ? '0.8' : 'none')};
`;

export const SealNumberWrapper = styled.div`
  color: #272f5ae5;
  font-size: 16px;
  font-weight: 500;
`;

export const SealDateWrapper = styled.div`
  color: #272f5a;
  margin-top: 8px;
`;
