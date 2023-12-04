import React from 'react';
import { useStore, useUnit } from 'effector-react';
import { Router } from './view/Router';
import { routerService } from './routerService.model';
import { ESecuredIdentityRoleName } from 'api/types';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { createBrowserRouter } from 'react-router-dom';

const { outputs } = routerService;

// export const RouterContainer = () => {
//   const { featureToggles } = useUnit({
//     featureToggles: developmentSettingsService.outputs.$featureToggles,
//   });
  // return null;
  // const currentUserRoles = useStore(outputs.$currentUserRoles);

  // const isRolesLoadded = useStore(outputs.$isCurrentUserLoading);

  // const roles =
  //   currentUserRoles.reduce((acc, { key }) => {
  //     if (!key) {
  //       return acc;
  //     }
  //     return [...acc, key];
  //   }, [] as ESecuredIdentityRoleName[]) || [];

  // console.log("RouterContainer")

//   return (
//     <Router
//       // roles={roles}
//       // isRolesLoadded={isRolesLoadded}
//       featureToggles={featureToggles}
//     />
//   );
// };
