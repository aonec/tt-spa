import { Select } from "antd";
import styled from "styled-components";

export const StyledSelctor = styled(Select)`
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

  .ant-select-arrow {
    transform: translateY(-9px);
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
    box-shadow: 0 2px 7px #188fffae;
  }
`;
