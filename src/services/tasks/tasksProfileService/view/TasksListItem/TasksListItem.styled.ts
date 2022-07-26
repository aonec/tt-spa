import styled from 'styled-components';
import { CalendarIcon, MapIcon, UserIcon } from 'ui-kit/icons';

export const TaskItemWrapper = styled.div`
  min-width: 850px;
  padding: 10px;
  margin-top: 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: #272f5a;

  transition: 0.2s;
  cursor: pointer;
  &:first-child {
    margin-top: 0px;
  }

  &:hover {
    border-color: #11043319;
    box-shadow: 0 4px 12px rgba(0, 0, 20, 0.16);

    .task-item-title {
      color: var(--primary-100);
    }
  }

  span {
    opacity: 0.8;
  }
`;

export const NameRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

export const TimerRowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const DeviceInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  svg:first-of-type {
    transform: scale(0.9);
  }
`;

export const InfoBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  svg:nth-child(1) {
    margin-left: 0px !important;
  }
`;

export const TaskNameWrapper = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #272f5a;
`;

export const TimeLine = styled.div`
  position: relative;
  flex-grow: 1;
  height: 4px;
  background: var(--bg);
  border-radius: 4px;
`;

export const Line = styled.div<{
  background: string;
  width: string;
}>`
  position: absolute;
  border-radius: inherit;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ background }) => background};
  width: ${({ width }) => width};
`;

export const TimeLineWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TimeWrapper = styled.span<{ fail?: boolean }>`
  color: ${({ fail }) => fail && 'var(--error)'};
  margin-left: 4px;
`;

export const SerialNumberWrapper = styled.span`
  font-weight: 600;
  margin-left: 6px;
`;

export const TextWrapper = styled.span`
  margin-left: 8px;
`;

export const MapIconSC = styled(MapIcon)`
  margin-left: 14px;
`;

export const CalendarIconSC = styled(CalendarIcon)`
  margin-left: 8px;
`;

export const UserIconSC = styled(UserIcon)`
  margin-left: 10px;
`;
