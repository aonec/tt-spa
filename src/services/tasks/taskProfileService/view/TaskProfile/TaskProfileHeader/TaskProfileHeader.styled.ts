import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 16px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
`;

export const PageHeaderWrapper = styled.div`
  color: #272f5a;
  font-weight: 400;
  font-size: 32px;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #272f5ae5;
  margin-top: 8px;
  min-height: 16px;
`;

export const TimerRowWrapper = styled.div`
  display: flex;
  align-items: center;

  color: #272f5ab2;
`;

export const TimelineRowWrapper = styled.div`
  color: #272f5ab2;
`;

export const DeviceIconWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: scale(1.2);
  margin-right: 12px;
`;

export const Line = styled.div<{ color?: string }>`
  position: relative;
  flex-grow: 1;
  height: 4px;
  background: ${({ color }) => color};
  border-radius: 4px;

  margin-right: 4px;
`;

export const TaskNamePanel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
