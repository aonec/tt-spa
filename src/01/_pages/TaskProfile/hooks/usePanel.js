import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

export const usePanel = (
  { panel = {}, panelLoading = false },
  pageDispatch,
) => {
  const { replace } = useHistory();
  const { url } = useRouteMatch();
  const [state, dispatch] = React.useReducer(dataReducer, {});
  React.useEffect(() => {
    if (!panelLoading) dispatch({ type: 'reset' });
  }, [panelLoading]);

  // React.useEffect(() => {
  //   panel.actions?.SwitchDevices && replace(url + "/step1")
  // }, [panel.actions?.SwitchDevices])

  const pushProps = {
    onClick() {
      !panelLoading && pageDispatch({ type: 'push_stage', data: state });
    },
    disabled: isDisabled(state, panel.actions ?? {}) || panelLoading,
    loading: panelLoading,
  };
  return {
    hiddenPanel: !panel.actions,
    isObserver: panel.userOperatingStatus === 'Observer',
    perpName: panel.perpName,
    pushProps,
    dispatch,
    expectedCompletionTime: panel.expectedCompletionTime,
    actions: panel?.actions,
    state,
  };
};

export function dataReducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case 'add_data':
      return { ...state, ...data };

    case 'email_notify':
      const { emailNotify = {} } = state;
      return { ...state, emailNotify: { ...emailNotify, ...data } };

    case 'reset':
      return {};

    default:
      console.error('panel', type);
      return state;
  }
}

function isDisabled(
  {
    nextPerpetratorId = null, documentsIds = [], nextStageId = null, nextStageDeadline = null,
    calculatorSwitch = null
  },
  {
    AddPerpetrator, AddDocuments, Switch, Completion, SetNextStageDeadline
  },
) {
  if (Switch && AddPerpetrator) return !nextPerpetratorId || !nextStageId;
  if (AddPerpetrator && SetNextStageDeadline) return !nextPerpetratorId || !nextStageDeadline;
  if (AddPerpetrator) return !nextPerpetratorId;
  if (AddDocuments) return !documentsIds.length || !calculatorSwitch;
  if (Completion) return false;

  return true;
}
