import { MenuItem } from 'services/menuService/menuService.types';

export type SubMenuProps = {
  subMenuItems: Omit<MenuItem, 'sub' | 'icon'>[];
};
