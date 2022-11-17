import styled from 'styled-components';

export const Wrapper = styled.div`
  height: calc(100vh - 60px - 15px - 60px);
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  padding: 15px;
`;

export const AddressWrapper = styled.div`
  margin-left: 10px;
`;

export const Address = styled.div`
  color: #272f5ae5;
  font-weight: 500;
  font-size: 16px;
`;

export const City = styled.div`
  color: #272f5acc;
  font-weight: 300;
  font-size: 12px;
  margin-top: 5px;
`;

export const ChevronWrapper = styled.div`
  transform: translate(-2px, -3px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  width: 20px;
  height: 20px;
  border-radius: 15px;

  &:hover {
    background: #dcdee499;
  }
`;

export const InfoWrapper = styled.div`
  padding: 15px;
  border-top: 1px solid #dcdee4;
  transition: 0.2s;
`;

export const InfoItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #dcdee4;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  align-items: center;
  font-size: 12px;
`;

export const InfoItemKey = styled.div`
  color: #272f5ab2;
`;

export const InfoItemValue = styled.div`
  color: #272f5ae5;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #f3f5f6;
  border-radius: 0 0 4px 4px;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
`;
