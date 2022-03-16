import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getTask, moveStage } from '01/_api/task_profile_page';
import { getCalculator } from '../../../_api/device_page';
import { pushStageFx } from '01/features/tasks/pushingStage/models';

export const usePageFetch = (state, dispatch) => {
  const { 0: id } = useParams();
  const { replace } = useHistory();

  const initTaskData = async () => {
    const task = await getTask(id);
    if (!task?.node) {
      dispatch({ type: 'success', data: task });
      return;
    }
    const calculator = await getCalculator(task.node.calculatorId);
    dispatch({ type: 'success', data: { ...task, calculator } });
  };

  React.useEffect(() => void initTaskData(), []);

  useEffect(() => pushStageFx.doneData.watch(initTaskData).unsubscribe, []);

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
