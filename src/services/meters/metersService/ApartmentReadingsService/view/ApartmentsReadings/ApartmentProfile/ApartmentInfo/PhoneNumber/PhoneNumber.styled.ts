import styled from 'styled-components';

export const InfoPanelLabel = styled.div`
  color: #272f5ab2;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;

  &:after {
    content: ':';
  }
`;

export const ExtraInfoText = styled.div`
  color: #272f5a;
  font-weight: 600;
  font-size: 12px;
`;

export const PhoneNumberHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PhoneNumberFooter = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const PhoneNumberWrapper = styled.div`
  color: #272f5ae5;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 25, 0.06);
  }
`;
