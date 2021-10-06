import { EditHomeownerPersonalNumber } from '01/features/homeownerAccount/editHomeownerAccountPersonalNumber';
import React from 'react';
import { Switch, Route } from 'react-router';

export const HomeownerRouteGroup = () => {
  return (
    <Switch>
      <Route path="/homeowner/:id/switchPersonalNumber" exact>
        <EditHomeownerPersonalNumber />
      </Route>
    </Switch>
  );
};
