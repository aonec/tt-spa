import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid rgba(39, 47, 90, 0.04);
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  margin-top: 16px;
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const ChevronIconRight = styled(ChevronIcon)`
  transform: rotate(180deg);
`;
