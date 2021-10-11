import { Select, AutoComplete } from 'antd';
import styled from 'styled-components';

export const StyledSelector = styled(Select)`
  width: 100%;
  
  .ant-select-selector {
    border: 1px solid lightgray;
    padding: 3px 15px;

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
  }
`;

export const StyledAutocomplete = styled(AutoComplete)`
  width: 100%;

  .ant-select-selector {
    border: 1px solid lightgray;
    padding: 3px 15px;

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
  }
`;

export const StyledInput = styled.input`
  color: #333333;
  border: 1px solid lightgray;
  padding: 3px 15px;
  transition: 0.2s;

  &:last-child {
    margin-right: 10px;
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 4px 8px #188fff52;
  }
`;
