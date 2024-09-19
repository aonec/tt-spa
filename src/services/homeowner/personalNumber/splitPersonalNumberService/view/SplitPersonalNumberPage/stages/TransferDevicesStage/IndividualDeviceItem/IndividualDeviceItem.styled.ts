import styled from 'styled-components';

export const Device = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  z-index: 0;
  transition: 0.2s;
  border-bottom: 1px solid #ededf1;

  column-gap: 10px;

  ${({ selected }: { selected?: boolean }) =>
    selected
      ? `
    background-color: #e0efff;
  `
      : `
    &:hover {
      background-color: #f5f5f5;
    }
  `};
`;

export const DateRangeContainer = styled.div`
  display: flex;
  line-height: 1.2;
  align-items: center;
  white-space: nowrap;
`;

export const DeviceName = styled.span`
  color: #272f5a66;
`;

export const DeviceSerialNumber = styled.span`
  font-weight: 500;
  color: #272f5aee;
`;
