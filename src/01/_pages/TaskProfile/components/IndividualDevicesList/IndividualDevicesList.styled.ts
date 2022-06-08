import { DeviceIcon } from 'ui-kit/icons';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 15px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-left: 10px;
`;

export const DevicesListWrap = styled.div`
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 11, 0.15);
`;

export const StyledDeviceIcon = styled(DeviceIcon)`
  transform: scale(1.2);
`;
