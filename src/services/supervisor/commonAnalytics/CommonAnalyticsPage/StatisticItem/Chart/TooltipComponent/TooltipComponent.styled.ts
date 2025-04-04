import styled from 'styled-components';

export const Pointer = styled.div<{ value: number }>`
  position: absolute;
  left: 15%;
  top: ${({ value }) => (value >= 0 ? '95%' : '-15%')};
  margin: 0 auto;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 6px 0 6px;
  border-color: rgba(39, 47, 90, 1) transparent transparent transparent;
  transform: translate(-50%, 0)
    ${({ value }) => (value >= 0 ? 'scale(1, 1)' : 'scale(1,-1)')};
`;

export const TooltipBlock = styled.div<{ value: number }>`
  display: inline-block;
  position: relative;
  background-color: rgba(39, 47, 90, 1);
  color: #fff;
  padding: 10px 6px 8px 6px;
  border-radius: 4px;
  border: 0;
  font-weight: 500;
  font-size: 10px;

  transform: ${({ value }) =>
    value >= 0 ? 'translate(-15%, -100%)' : 'translate(-15%, 35%)'};
`;

export const Quantity = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
`;

export const DetailsBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 6px;
`;
