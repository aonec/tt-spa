import { AddIndividualDevice } from '01/features/individualDevices/addIndividualDevice';
import { SwitchIndividualDevice } from '01/features/individualDevices/switchIndividualDevice';
import { ReadingHistoryPage } from '01/features/readings/displayReadingHistory';
import React from 'react';
import { Route, Switch } from 'react-router';

export const ApartmentsRouteGroup = () => (
  <Switch>
    <Route path="/apartment/:id/addIndividualDevice" exact>
      <AddIndividualDevice />
    </Route>

    <Route
      path="/apartment/:id/individualDevice/:deviceId/readingHistory"
      exact
    >
      <ReadingHistoryPage />
    </Route>
    <Route path="/houses/individualDevice/:deviceId/readingHistory" exact>
      <ReadingHistoryPage />
    </Route>
    <Route path="/apartment/:id/individualDevice/:deviceId/switch" exact>
      <SwitchIndividualDevice type="switch" />
    </Route>
    <Route path="/apartment/:id/individualDevice/:deviceId/check" exact>
      <SwitchIndividualDevice type="check" />
    </Route>
    <Route path="/apartment/:id/individualDevice/:deviceId/reopen" exact>
      <SwitchIndividualDevice type="reopen" />
    </Route>

    <Route path="/apartment/:id/switchPersonalNumber" exact>
      Изменение лицевого счета
    </Route>
  </Switch>
);
