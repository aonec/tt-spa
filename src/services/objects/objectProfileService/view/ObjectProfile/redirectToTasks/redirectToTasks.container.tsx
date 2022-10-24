import React from 'react';
import { useStore } from "effector-react";

import { objectProfileService } from '../../../objectProfileService.model'
import {TasksCard} from "../../../../../apartments/tasksCardService/view/TasksCard";
import { Wrapper } from './redirectToTasks.styled'

const { outputs } = objectProfileService

export const RedirectToTasksContainer = () => {
  const tasksCount = useStore(outputs.$taskCount)
  const housingStockId = useStore(outputs.$housingStockId)
  const isAdministrator = useStore(outputs.$isAdministrator);

  if (!housingStockId) {
    return null
  }

  return (
    <Wrapper >
      <TasksCard
        id={String(housingStockId)}
        tasksNumber={tasksCount}
        isAdministrator={isAdministrator}
        type="housingStock"
      />
    </Wrapper>
  );
};
