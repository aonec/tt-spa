import { Form } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled(Form)`
  margin-bottom: 20px;
`;

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #a1a1a1;
  transition: 0.2s;
  user-select: none;
  gap: 8px;
  svg {
    path {
      fill: #a1a1a1;
    }
  }

  &:hover {
    color: red;
    svg {
      path {
        fill: red;
      }
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
`;

export const GridContainerOwner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  user-select: none;
`;
