/* eslint-disable */

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getTask, moveStage } from '01/_api/task_profile_page';
import { getCalculator } from '../../../_api/device_page';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

export const usePageFetch = (state, dispatch) => {
  const { 0: id } = useParams();
  const { replace } = useHistory();
  React.useEffect(() => {
    const initTaskData = async () => {
      const task = await getTask(id);
      const address = task?.address;

      if (!task?.node) {
        dispatch({ type: 'success', data: { ...task, address } });
        return;
      }
      const calculator = await getCalculator(task.node.calculatorId);
      dispatch({
        type: 'success',
        data: { ...task, calculator, stages: task.stages, address },
      });
    };

    initTaskData();

    // getTask(id).then((data) => {
    //   getCalc(data.id).then((res) =>
    //     dispatch({ type: 'success', data: { res, data } })
    //   );
    //   dispatch({ type: 'success', data });
    // });
  }, []);

  React.useEffect(() => {
    const { stageData = null, isReplace = false } = state;
    if (isReplace) replace('/tasks/');
    if (stageData) {
      moveStage(id, stageData.move, stageData.data).then((data) => {
        dispatch({ type: 'success', data });
      });
    }
  }, [state]);
};

// useEffect(() => pushStageFx.doneData.watch(initTaskData).unsubscribe, []);
