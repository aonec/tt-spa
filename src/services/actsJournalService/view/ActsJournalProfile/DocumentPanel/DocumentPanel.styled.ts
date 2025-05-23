import styled from 'styled-components';
import { CloseDarkIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  justify-content: space-between;

  height: 32px;
  max-width: 200px;
  border: 1px solid rgba(39, 47, 90, 0.25);
  border-radius: 4px;
  padding: 6px;

  &:hover {
    cursor: pointer;
    border: 1px solid rgba(24, 158, 233, 1);
    transition: 0.2s;
  }
`;

export const NameWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: rgba(39, 47, 90, 0.9);
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CloseDarkIconSC = styled(CloseDarkIcon)`
  &:hover path {
    fill: rgba(255, 0, 0, 0.93);
  }
`;
