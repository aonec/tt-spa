import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const PanelWrapper = styled.div`
  width: 100%;
  height: 72px;
  background: white;
  border: 1px solid #dcdee4;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: 0.2s;
  cursor: pointer;
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16),
      0px 8px 16px rgba(78, 33, 146, 0.1);
  }
`;

export const TextWrapper = styled.span`
  color: #272f5a;
  font-weight: 500;
  margin-left: 8px;
`;

export const GroupWrrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChevronIconSC = styled(ChevronIcon)`
  transform: rotate(180deg);
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;

    path {
      fill: #272f5a;
    }
  }
`;
