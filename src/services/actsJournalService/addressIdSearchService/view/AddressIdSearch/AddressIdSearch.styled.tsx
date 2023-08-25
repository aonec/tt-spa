import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 35px;
  background-color: #188fff;
  color: white;
  backdrop-filter: blur(4px);
  border-radius: 4px;
  padding: 2px 8px;
  width: 100%;
  z-index: 10;
  cursor: pointer;
`;

export const PopoverWrapper = styled.div`
  position: relative;
`;

export const InputSC = styled.input`
  height: 30px;
  border-left: 1px solid lightgray;
  padding: 0 7px;

  &:disabled {
    background: #ebebf0c0;
  }
`;

export const SearchWrapper = styled.div<{
  isSuccess?: boolean;
  focused?: boolean;
  error?: boolean;
}>`
  display: grid;
  grid-template-columns: 12px 0.8fr 0.35fr 0.3fr;
  position: relative;
  color: #333333;
  border: 1px solid lightgray;
  padding-left: 10px;
  transition: 0.2s;
  align-items: center;

  &:last-child {
    margin-right: 10px;
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  ${({ focused }) => focused && `border: 1px solid #1890ff;`}

  ${({ isSuccess }) =>
    isSuccess && `border: 1px solid #00c34e; box-shadow: 0 4px 8px #1dbf7438;`}

${({ error }) =>
    error && `border: 1px solid #c31700; box-shadow: 0 4px 8px #bf1d1d38;`}

  &:focus {
    box-shadow: 0 4px 8px #188fff52;
  }
`;
