import React, { FC, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { useMenuItems } from './menuService.hook';
import { menuService } from './menuService.model';
import { filterMenuItems } from './menuService.utils';
import { Menu } from './view/Menu';
import { UserInfo } from './view/UserInfo';
import { hidden, privates } from './menuService.constants';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { DevelopmentSettingsContainer } from 'services/developmentSettings/developmentSettings.container';
import { currentOrganizationService } from 'services/currentOrganizationService';
import { MenuContainerProps } from './menuService.types';

const { outputs, gates } = menuService;
const { UserRolesGate } = gates;

export const MenuContainer: FC<MenuContainerProps> = ({ isOpen }) => {
  const {
    currentUser,
    isCurrentUserLoading,
    openDevSettingsModal,
    currentManagingFirm,
  } = useUnit({
    currentUser: outputs.$currentUser,
    isCurrentUserLoading: outputs.$isCurrentUserLoading,
    openDevSettingsModal:
      developmentSettingsService.inputs.openDevSettingsModal,
    currentManagingFirm:
      currentOrganizationService.outputs.$currentManagingFirm,
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
      <UserInfo
        isOpen={isOpen}
        isLoading={isCurrentUserLoading}
        currentUser={currentUser}
        currentManagingFirm={currentManagingFirm}
      />
      <Menu
        isOpen={isOpen}
        menuItems={filteredMenuItems}
        openDevSettingsModal={openDevSettingsModal}
      />
    </>
  );
};
