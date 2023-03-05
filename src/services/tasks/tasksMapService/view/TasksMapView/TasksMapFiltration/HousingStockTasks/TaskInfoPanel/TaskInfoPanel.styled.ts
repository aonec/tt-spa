import styled from 'styled-components';
import { Footer } from '../../TasksMapFiltration.styled';

export const Wrapper = styled.div`
  padding-top: 12px;
  border-top: 1px solid #f3f5f6;
`;

export const Title = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

export const Description = styled.div`
  color: rgba(39, 47, 90, 0.8);
  font-weight: 300;
  font-size: 12px;
  margin-top: 4px;
`;

export const FooterWrapper = styled(Footer)`
  margin-top: 16px;
  width: calc(100% + 32px);
  transform: translateX(-16px);
`;

export const TimelineWrapper = styled.div`
  margin-top: 8px;
`;

export const TimerWrapper = styled.div`
  margin-top: 8px;
`;

export const ListWrapper = styled.div`
  margin-top: 12px;
`;

export const DeviceWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: rgba(39, 47, 90, 0.9);
`;

export const DeviceSerialNumber = styled.div`
  color: rgba(39, 47, 90, 0.5);
`;

export const DeviceNumber = styled.div`
  font-weight: 500;
`;
