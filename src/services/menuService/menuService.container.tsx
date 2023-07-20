import React, { useMemo } from 'react';
import { useUnit } from 'effector-react';
import { useMenuItems } from './menuService.hook';
import { menuService } from './menuService.model';
import { filterMenuItems } from './menuService.utils';
import { Menu } from './view/Menu';
import { UserInfo } from './view/UserInfo';
import { hidden, privates } from './menuService.constants';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { DevelopmentSettingsContainer } from 'services/developmentSettings/developmentSettings.container';

const { outputs, gates } = menuService;
const { UserRolesGate, CurrentUserGate } = gates;

export const MenuContainer = () => {
  const { currentUser, isCurrentUserLoading, openDevSettingsModal } = useUnit({
    currentUser: outputs.$currentUser,
    isCurrentUserLoading: outputs.$isCurrentUserLoading,
    openDevSettingsModal:
      developmentSettingsService.inputs.openDevSettingsModal,
  });

  const menuItems = useMenuItems();
  const userRoles = useMemo(() => currentUser?.roles, [currentUser]);

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
      <DevelopmentSettingsContainer isAuth />
      <UserRolesGate />
      <CurrentUserGate />
      <UserInfo isLoading={isCurrentUserLoading} currentUser={currentUser} />
      <Menu
        menuItems={filteredMenuItems}
        openDevSettingsModal={openDevSettingsModal}
      />
    </>
  );
};
