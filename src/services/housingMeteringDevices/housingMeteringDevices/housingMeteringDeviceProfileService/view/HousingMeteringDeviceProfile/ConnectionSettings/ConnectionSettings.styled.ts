import styled from 'styled-components';

export const CalculatorItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
  padding: 8px 0px;
  margin-right: 20px;
`;

export const NameWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 10px;
  &:hover {
    color: var(--primary-100);
  }
`;

export const Name = styled.div`
  margin-right: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

export const Serial = styled.div`
  color: rgba(39, 47, 90, 0.6);
  &:hover {
    color: var(--primary-100);
  }
`;
