import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 900px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.div`
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
  color: #272f5ab2;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1.5fr;
  grid-gap: 45px;
`;

export const PageTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  margin-bottom: 10px;
`;

export const BlockTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  user-select: none;
`;


