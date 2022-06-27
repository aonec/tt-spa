import { MenuItem } from './../../../../../menuService.types';

export type SubMenuItemProps = {
  subMenuItem: Omit<MenuItem, 'sub' | 'icon'>;
};
