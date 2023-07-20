import styled from 'styled-components';

export const StyledSquareButton = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid lightgray;
  padding: 4px 16px;
  transition: 0.2s;

  border-radius: 4px !important;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 2px 7px #188fffae;
  }
`;
