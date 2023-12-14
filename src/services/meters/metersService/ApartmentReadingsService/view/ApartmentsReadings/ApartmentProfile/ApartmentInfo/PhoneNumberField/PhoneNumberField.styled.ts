import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { ContextMenuButtonColorsLookup } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export const FieldName = styled.div`
  color: #272f5ab2;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DropdownSC = styled(Dropdown)`
  width: 156px;
`;

export const MenuItem = styled(Menu.Item)<{ color?: string }>`
  width: 156px;
  height: 32px;
  padding: 8px !important;
  border-radius: 8px !important;

  color: ${({ color = ContextMenuButtonColorsLookup.primary }) =>
    color} !important;

  .ant-dropdown-menu-title-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 32px;

    font-size: 12px;
    margin-left: 0px;
  }

  &:hover {
    color: #272f5a !important;
    background-color: #f3f5f6 !important;
  }
`;

export const ValueWrapper = styled.div`
  color: #272f5a;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  min-height: 20px;

  width: 156px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 25, 0.06);
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextWrapper = styled.span`
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;
