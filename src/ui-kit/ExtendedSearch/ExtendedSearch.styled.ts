import styled from 'styled-components';
import { CloseIcon } from 'ui-kit/icons';

export const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 16px;
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
  padding: 6px 12px 16px;
`;

export const Header = styled.div`
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Footer = styled.div`
  padding: 12px;
  background: #f3f5f6;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const SearchContentWrap = styled.div`
  width: 100%;
  margin-left: 16px;
`;

export const ExtendedSearchWrap = styled.div`
  margin-bottom: 16px;
  border-radius: 10px;
  border: 2px solid #f3f5f6;
`;

export const ClearIconSC = styled(CloseIcon)`
  transform: translateY(2px);
`;

export const Title = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 20px;
`;
