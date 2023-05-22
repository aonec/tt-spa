import styled from 'styled-components';
import { deviceSealLineGridTemplate } from '../IndividualDevicesList.styled';

export const Wrapper = styled.div<{ isDeviceClosed?: boolean }>`
  padding: 10px 0 10px 10px;
  display: grid;
  grid-template-columns: ${deviceSealLineGridTemplate};
  grid-gap: 15px;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  opacity: ${({ isDeviceClosed }) => (isDeviceClosed ? '0.8' : 'none')};
`;
