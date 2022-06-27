import { useStore } from 'effector-react';
import React from 'react';
import { menuItems } from './menuService.data';
import { menuService } from './menuService.model';
import { Menu } from './view/Menu';
import { UserInfo } from './view/UserInfo';

const { outputs, gates } = menuService;
const { UserRolesGate, CurrentUserGate } = gates;

export const MenuContainer = () => {
  const roles = useStore(outputs.$userRoles);
  const currentUser = useStore(outputs.$currentUser);
  const isCurrentUserLoading = useStore(outputs.$isCurrentUserLoading);

  const filteredMenuItems = menuItems.filter(({ type }) => {
    return true;
  });

  return (
    <>
      <UserRolesGate />
      <CurrentUserGate />
      <UserInfo isLoading={isCurrentUserLoading} currentUser={currentUser} />
      <Menu menuItems={filteredMenuItems} />
    </>
  );
};
