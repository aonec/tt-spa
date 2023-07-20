import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { useMenuItems } from './menuService.hook';
import { menuService } from './menuService.model';
import { filterMenuItems } from './menuService.utils';
import { Menu } from './view/Menu';
import { UserInfo } from './view/UserInfo';
import { hidden, privates } from './menuService.constants';

const { outputs, gates } = menuService;
const { UserRolesGate, CurrentUserGate } = gates;

export const MenuContainer = () => {
  const currentUser = useStore(outputs.$currentUser);

  const userRoles = useMemo(() => currentUser?.roles, [currentUser]);

  const isCurrentUserLoading = useStore(outputs.$isCurrentUserLoading);

  const menuItems = useMenuItems();

  const filteredMenuItems = useMemo(() => {
    if (!userRoles) return [];

    return filterMenuItems(
      menuItems,
      privates,
      hidden,
      userRoles.map((elem) => elem.key!),
    );
  }, [menuItems, userRoles]);

  return (
    <>
      <UserRolesGate />
      <CurrentUserGate />
      <UserInfo isLoading={isCurrentUserLoading} currentUser={currentUser} />
      <Menu menuItems={filteredMenuItems} />
    </>
  );
};
