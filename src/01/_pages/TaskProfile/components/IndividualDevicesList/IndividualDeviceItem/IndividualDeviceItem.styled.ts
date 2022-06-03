import { Link } from './../../../../../shared/ui/SidePanel/SidePanel.styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 15px;
  border-bottom: 1px solid #dcdee499;

  &:last-child {
    border-bottom: none;
  }
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

export const DeviceInfoItem = styled.div`
  padding: 12px 6px;
  border-bottom: 1px solid #dcdee4;
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  color: #272f5ae5;
  font-weight: 400;
  font-size: 14px;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const DeviceInfoItemLabel = styled.div`
  opacity: 0.85;
`;
