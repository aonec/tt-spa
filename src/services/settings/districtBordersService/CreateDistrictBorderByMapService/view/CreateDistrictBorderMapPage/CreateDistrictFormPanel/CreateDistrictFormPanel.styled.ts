import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 352px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
`;

export const Header = styled.div`
  padding: 16px;
`;

export const Title = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-weight: 400;
  font-size: 14px;
`;

export const ListWrapper = styled.div`
  max-height: 500px;
  overflow: auto;
`;

export const AddressItem = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #dcdee488;
  margin-right: 16px;

  &:last-child {
    border-bottom: 0;
  }
`;

export const Footer = styled.div`
  display: flex;
  padding: 16px;
  background: #f3f5f6;
  justify-content: flex-end;
  gap: 12px;
  border-radius: 0 0 4px 4px;
`;

export const FormWrapper = styled.div`
  padding: 8px 16px;
`;

export const SelectColorOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColorCircle = styled.div<{ color: string; strokeColor: string }>`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: ${({ color }) => color};
  border: 3px solid ${({ strokeColor }) => strokeColor};
`;
