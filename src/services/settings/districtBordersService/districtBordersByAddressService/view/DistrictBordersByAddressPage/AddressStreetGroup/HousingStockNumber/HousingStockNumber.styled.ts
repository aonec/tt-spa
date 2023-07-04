import styled from 'styled-components';

export const HousingStockNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 60px;
  width: 100px;

  cursor: pointer;

  &:first-child {
    margin-top: 0px;
  }
  &:last-child {
    padding-bottom: 16px;
  }
`;

export const Number = styled.div<{ isChecked: boolean }>`
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: rgba(39, 47, 90, 0.9);
  user-select: none;

  font-weight: ${({ isChecked }) => (isChecked ? '500' : '400')};
`;
