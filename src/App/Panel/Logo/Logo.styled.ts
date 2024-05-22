import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  font-size: 14px;
  line-height: 2;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CompanyName = styled.span`
  font-weight: 500;
  margin: 0 4px 0 8px;
`;

export const LogoImg = styled.img`
  width: 26px;
`;

export const ChevronWrapper = styled.div<{ isOpen?: boolean }>`
  cursor: pointer;
  transition: 0.2s;

  transform: rotate(${({ isOpen }) => (isOpen ? 0 : 180)}deg);
`;
