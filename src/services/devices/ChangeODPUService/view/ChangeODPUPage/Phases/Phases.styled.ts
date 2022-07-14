import { Collapse, Input } from "antd";
import styled from "styled-components";

export const CollapseSC = styled(Collapse)`
  border: 1px solid #dcdee4;
  border-radius: 4px 4px 0px 0px;
  background-color: #f3f5f6;

  & .ant-collapse-item-active {
    background-color: white;
    border: 0px;
    .ant-collapse-content-active {
      border-top: unset;
    }
  }
  & .ant-collapse-item {
    border-bottom: 1px solid #dcdee4;
  }
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContainerThreeItemUnequal = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr;
  gap: 16px;
`;

export const StyledContinerMainRows = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 8px;
  max-height: 500px;
`;

export const GovernmentCheckingContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 8px;
`;

export const PlombsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 16px;

  & h2 {
    grid-column: 1/3;
  }
`;

export const StyledContainerFourItemsEqual = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr;
  gap: 16px;
`;

export const InputSC = styled(Input)`
  border-color: ${({ status }: { status: boolean }) =>
    status ? 'red' : undefined};
`;

export const StyledSectionHeader = styled.h2`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;
