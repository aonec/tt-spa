import styled from 'styled-components';

export const Wrapper = styled.div`
  height: calc(100vh - 60px - 15px - 60px);
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
`;
