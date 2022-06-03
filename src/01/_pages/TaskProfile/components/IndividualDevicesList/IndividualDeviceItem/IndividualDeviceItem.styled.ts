import { Link } from './../../../../../shared/ui/SidePanel/SidePanel.styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 11, 0.15);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RightHeaderPanel = styled.div`
  display: flex;
  align-items: center;
`;

export const ReadingsHistoryButtonWrapper = styled.div`
  margin-left: 15px;
`;

export const ChevronWrapper = styled.div`
  cursor: pointer;
  margin-left: 15px;
  transform: scale(1.1);
`;

export const LinkOnProfile = styled(Link)`
  transform: translateY(-2px);
  color: #272f5a;
  transition: 0.2s;

  &:hover {
    color: #189ee9;
  }
`;
