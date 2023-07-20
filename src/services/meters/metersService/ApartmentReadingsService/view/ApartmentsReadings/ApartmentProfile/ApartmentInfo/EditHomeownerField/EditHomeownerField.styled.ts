import styled from 'styled-components';
import { Input } from 'ui-kit/Input';

export const FieldName = styled.div`
  color: #272f5ab2;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Footer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const ValueWrapper = styled.div`
  color: #272f5a;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 25, 0.06);
  }
`;

export const EditingField = styled(Input)`
  color: #272f5a;
  font-weight: 600;
  font-size: 14px;
`;
