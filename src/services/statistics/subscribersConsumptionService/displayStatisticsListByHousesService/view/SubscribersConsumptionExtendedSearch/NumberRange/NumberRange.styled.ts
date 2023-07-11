import styled from 'styled-components';

export const Input = styled.input``;

type WrapProps = {
  disabled?: boolean;
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 20px 0.5fr;
  grid-gap: 10px;
  align-items: center;
  border: 1px solid lightgray;
  transition: 0.2s;

  border-radius: 4px !important;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;
  padding: 0 10px;
  transition: 0.2s;

  ${({ disabled }: WrapProps) =>
    disabled
      ? `
        background: #f3f3f3; 
        cursor: not-allowed;
        box-shadow: none;
    `
      : `&:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 2px 7px #188fffae;
  }`}
`;
