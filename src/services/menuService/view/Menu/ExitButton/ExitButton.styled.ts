import { ExitIcon } from 'ui-kit/icons';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 16px;
  cursor: pointer;
  color: #272f5a;
  transition: 0.2s;

  &:hover {
    color: #189ee9;
    .exit-button-icon {
      path {
        fill: #189ee9;
        stroke: #189ee9;
      }
    }
  }
`;

export const Text = styled.div`
  margin-left: 8px;
  font-weight: 500;
`;

export const ExitIconSC = styled(ExitIcon)`
  transform: scale(1.1);
`;
