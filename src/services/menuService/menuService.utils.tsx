import { ESecuredIdentityRoleName } from 'myApi';
import { MenuFiltrationConfig, MenuItem } from './menuService.types';

export function filterMenuItems(
  menuItems: MenuItem[],
  privates: MenuFiltrationConfig,
  hidden: MenuFiltrationConfig,
  userRoles: ESecuredIdentityRoleName[]
): MenuItem[] {
  const filteredMenuItems = menuItems.reduce((acc, item) => {
    const menuType = item.type;

    const privateMenuItemRoles = privates[menuType];
    const hiddenMenuItemRoles = hidden[menuType];

    if (privateMenuItemRoles) {
      const isShowMenuItem = isArraysIntersect(privateMenuItemRoles, userRoles);

      if (!isShowMenuItem) return acc;

      return [...acc, item];
    }

    if (hiddenMenuItemRoles) {
      const isHideMenuItem = isArraysIntersect(hiddenMenuItemRoles, userRoles);

      console.log(isHideMenuItem, hiddenMenuItemRoles, userRoles);

      if (isHideMenuItem) return acc;
    }

    return [...acc, item];
  }, [] as MenuItem[]);

  return filteredMenuItems.map((menuItem) => {
    if (!menuItem.sub) return menuItem;

    const filteredSubMenuItems = filterMenuItems(
      menuItem.sub,
      privates,
      hidden,
      userRoles
    );

    return { ...menuItem, icon: menuItem.icon, sub: filteredSubMenuItems };
  });
}

function isArraysIntersect<T>(arrA: T[], arrB: T[]) {
  return Boolean(arrA.filter((x) => arrB.includes(x)).length);
}
