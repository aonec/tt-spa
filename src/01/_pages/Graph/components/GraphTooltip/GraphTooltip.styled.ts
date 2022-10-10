import styled from "styled-components";

export const TooltipBlock = styled.div<{ value: number }>`
  display: inline-block;
  position: relative;
  background-color: var(--main-100);
  padding: 8px 16px;
  border-radius: 4px;
  border: 0;
  transform: ${({ value }) =>
    value >= 0 ? 'translate(-15%, -135%)' : 'translate(-15%, 35%)'};
`;

export const DateBlock = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #fff;
`;

export const Value = styled.div`
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
`;

export const Pointer = styled.div<{ value: number }>`
  position: absolute;
  left: 15%;
  top: ${({ value }) => (value >= 0 ? '95%' : '-15%')};
  margin: 0 auto;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 6px 0 6px;
  border-color: var(--main-100) transparent transparent transparent;
  transform: translate(-50%, 0)
    ${({ value }) => (value >= 0 ? 'scale(1, 1)' : 'scale(1,-1)')};
`;