import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-bottom: 15px;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  color: #272f5ab2;
`;

export const DeviceRowWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #e3e3eb;
  align-items: center;
`;

export const DeviceInfoWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const DeviceInfoStrokeWrap = styled.div`
  margin-left: 25px;
`;

export const DetePickerWrap = styled.div`
  width: 250px;
`;
