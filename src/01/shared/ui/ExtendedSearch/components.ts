import styled from 'styled-components';

export const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 15px;
`;

export const ExtendedSearchButton = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  border: 1px solid #dcdee4;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  box-shadow: 0 4px 7px #02004b1f;

  &:hover {
    border-color: #189ee9;
    background-color: #189ce91e;
  }
`;

export const DisabledExtendedSearchButton = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  border: 1px solid #dcdee4;
  justify-content: center;
  border-radius: 4px;
  background: #dfdfdf99;
  opacity: 0.7;
`;

export const HideExtendedSearchButton = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  background: #189ee9;
  color: white;

  &:hover {
    background-color: #189ce9c8;
  }
`;

export const Content = styled.div`
  padding: 15px 10px;
`;

export const Header = styled.div`
  padding: 10px;
  display: flex;
`;

export const Footer = styled.div`
  padding: 10px;
  background: #f3f5f6;
  display: flex;
  justify-content: flex-end;
`;

export const SearchContentWrap = styled.div`
  width: 100%;
  margin-left: 15px;
`;

export const ExtendedSearchWrap = styled.div`
  margin: 0 5px 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;
