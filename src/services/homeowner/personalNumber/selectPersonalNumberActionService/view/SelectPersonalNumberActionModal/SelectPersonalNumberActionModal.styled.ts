import styled from 'styled-components';

export const SelectItem = styled.div`
  border: 1px solid rgba(220, 222, 228, 1);
  gap: 16px;
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 14px 18px;

  transition: 0.2s;

  &:hover {
    border: 1px solid rgba(24, 158, 233, 1);
    box-shadow: 0 4px 8px rgba(24, 158, 233, 0.32);
  }

  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledSelectItemTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: rgba(39, 47, 90, 0.9);
`;
