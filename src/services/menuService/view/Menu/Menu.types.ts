import { MenuItem } from '../../menuService.types';

export type MenuProps = {
  menuItems: MenuItem[];
  openDevSettingsModal: () => void;
  isOpen: boolean;
};
