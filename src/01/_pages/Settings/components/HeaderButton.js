import React, { useContext } from 'react';
import { SettingsContext } from '../index';
import EditButtonTT from '../../../tt-components/EditButtonTT';
import { Icon } from '../../../_components/Icon';

const HeaderButton = () => {
  const { currentTabKey, showStaff, showContractor } = useContext(
    SettingsContext,
  );
  switch (currentTabKey) {
    case '1':
      return null;
    case '2':
      return (
        <EditButtonTT size="48" onClick={showStaff}>
          <Icon icon="plus" />
        </EditButtonTT>
      );
    case '3':
      return (
        <EditButtonTT size="48" onClick={showContractor}>
          <Icon icon="plus" />
        </EditButtonTT>
      );
    default:
      return null;
  }
};

export default HeaderButton;
