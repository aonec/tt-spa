import styled from 'styled-components';
import { MapIcon } from 'ui-kit/icons';

export const TaskItemWrapper = styled.div`
  cursor: pointer;
  padding: 8px;
  color: #272f5a;

  &:hover {
    color: var(--primary-100);
    box-shadow: var(--shadow);
  }
  span {
    opacity: 0.8;
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Infowrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`

export const TaskNameWrapper = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #272f5a !important;
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
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time {
  }
`;

export const TimeWrapper = styled.span<{ fail?: boolean }>`
  color: ${({ fail }) => fail && 'var(--error)'};
  margin: 0 4px;
`;

export const TextWrapper = styled.span`
  margin: 0 6px;
`;

export const MapIconSC = styled(MapIcon)`
  margin-left: 10px;
`