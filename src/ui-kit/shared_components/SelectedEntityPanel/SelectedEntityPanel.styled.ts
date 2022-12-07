import styled from 'styled-components';
import { PencilIcon, XIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-radius: 4px;
  border: 1px solid #dcdee4;
  background-color: rgba(39, 47, 90, 0.04);
  padding: 0 16px;
`;

export const XIconSC = styled(XIcon)`
  path {
    fill: #272f5a52;
  }
  cursor: pointer;
`;

export const PencilIconSC = styled(PencilIcon)`
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
