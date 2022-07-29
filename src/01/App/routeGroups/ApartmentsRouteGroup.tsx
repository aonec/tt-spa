import React from 'react';
import { Route, Switch } from 'react-router';
import { AddPersonalNumberPage } from '../../features/homeowner/addPersonalNumber';
import { EditHomeownerPersonalNumberPage } from '../../features/homeowner/editPersonalNumber';
import { SplitPersonalNumber } from '../../features/homeowner/splitPersonalNumber';
import { SwitchPersonalNumberPage } from '../../features/homeowner/switchPersonalNumber';
import { AddIndividualDevice } from '../../features/individualDevices/addIndividualDevice';
import { SwitchIndividualDevice } from '../../features/individualDevices/switchIndividualDevice';
import { ReadingHistoryPage } from '../../features/readings/displayReadingHistory';

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
    <Route path="/apartment/:id/homeowners/addPersonalNumber" exact>
      <AddPersonalNumberPage />
    </Route>
    <Route path="/apartment/:id/homeowners/:homeownerId/splitApartment" exact>
      <SplitPersonalNumber />
    </Route>
    <Route
      path="/apartment/:id/homeowners/:homeownerId/editPersonalNumber"
      exact
    >
      <EditHomeownerPersonalNumberPage />
    </Route>
    <Route
      path="/apartment/:id/homeowners/:homeownerId/switchPersonalNumberFx"
      exact
    >
      <SwitchPersonalNumberPage />
    </Route>
  </Switch>
);
