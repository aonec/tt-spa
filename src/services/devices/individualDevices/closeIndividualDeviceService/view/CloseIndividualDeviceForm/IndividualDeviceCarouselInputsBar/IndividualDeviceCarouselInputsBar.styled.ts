import styled from 'styled-components';
import { MonthWrapper } from 'services/devices/housingMeteringDevices/housingMeteringDeviceReadingsService/view/MeteringDeviceMonthReading/MeteringDeviceMonthReading.styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  margin: 8px 0px;

  box-shadow: 0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const TitleWrapper = styled.div`
  color: #272f5ab2;
  font-weight: 500;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  font-size: 16px;
  color: #272f5ab2;
`;

export const SerialNumberWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 12px;
  user-select: none;
`;

export const MonthWrapperWithMargin = styled(MonthWrapper)`
  margin-bottom: 12px;
  width: 100%;
  justify-content: center;
`;
