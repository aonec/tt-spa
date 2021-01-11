import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const ADD_READINGS = 'ADD_READINGS';
const UPDATE_READINGS = 'UPDATE_READINGS';

export const usePanel = (
  {
    panel = {}, panelLoading = false, apartment, stages,
  },
  pageDispatch,
) => {
  const { replace } = useHistory();
  const { url } = useRouteMatch();
  const [state, dispatch] = React.useReducer(dataReducer, {});
  const isObserver = panel.userOperatingStatus === 'Observer';

  React.useEffect(() => {
    if (!panelLoading && !state.readings) dispatch({ type: 'reset' });
  }, [panelLoading]);

  window.state = state;

  // React.useEffect(() => {
  //   panel.actions?.SwitchDevices && replace(url + "/step1")
  // }, [panel.actions?.SwitchDevices])

  const pushProps = {
    onClick() {
      !panelLoading && pageDispatch({ type: 'push_stage', data: state });
    },
    disabled: isDisabled(state, panel.actions ?? {}) || panelLoading || isObserver,
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
    apartment,
    state,
    stages,
  };
};

export function dataReducer(state, action) {
  const { type, data } = action;
  console.log(state)
  console.log("data", data)
  const { emailNotify = {} } = state;
  switch (type) {
    case 'add_data':
      console.log('add_data')
      return { ...state, ...data };

    case 'add_email_message':
      return { ...state, emailNotify: { ...emailNotify, ...data } };

    case 'add_email_contractor':
      return { ...state, emailNotify: { ...emailNotify, ...data } };

    case ADD_READINGS:
      return { ...state, readings: action.readings };

    case UPDATE_READINGS:
      return {
        ...state,
        devices: state.devices.map(
          (device) => (device.id === action.deviceId
            ? {
              ...device,
              readings: device.readings.map(
                (reading, index) => (index === 0
                  ? {
                    ...reading,
                    [`value${action.readingNumber}`]: action.readingValue,
                  }
                  : reading),
              ),
            } : device),
        ),
      };

    case 'reset':
      return {};

    default:
      console.error('panel', type);
      return state;
  }
}

export const addReadings = (readings) => ({ type: ADD_READINGS, readings });

function isDisabled(
  {
    nextPerpetratorId = null,
    documentsIds = [],
    nextStageId = null,
    nextStageDeadline = null,
  },
  {
    AddPerpetrator,
    AddDocuments,
    Switch,
    Completion,
    SetNextStageDeadline,
    UploadReadings,
    isObserver,
    Contractors
  },
) {
  if (Switch && AddPerpetrator) return !nextPerpetratorId || !nextStageId;
  if (Switch && AddDocuments) return !documentsIds.length;
  if (Switch) return !nextStageId;
  if (AddPerpetrator && SetNextStageDeadline) return !nextPerpetratorId || !nextStageDeadline;
  if (AddPerpetrator) return !nextPerpetratorId;
  if (Completion) return false;
  if (UploadReadings) return false;
  if (AddDocuments) return !documentsIds.length;

  return true;
}
