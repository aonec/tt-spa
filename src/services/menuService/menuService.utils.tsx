import { StringStringDictionaryItem } from 'myApi';
import {
  MenuFiltrationConfig,
  MenuItem,
  SubMenuItem,
} from './menuService.types';

export function filterMenuItems(
  menuItems: MenuItem[],
  privates: MenuFiltrationConfig,
  hidden: MenuFiltrationConfig,
  roles: StringStringDictionaryItem[]
) {
    
  return menuItems.reduce((acc, item) => {
    const menuType = item.type;

    

    return acc;
  }, [] as MenuItem[]);
}
