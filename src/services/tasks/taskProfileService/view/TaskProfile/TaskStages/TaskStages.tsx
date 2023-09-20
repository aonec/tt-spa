import React, { FC, useMemo } from 'react';
import { Stage } from './Stage';
import {
  DisconnectionWrapper,
  MessageButton,
  TitleWrapper,
  Wrapper,
} from './TaskStages.styled';
import { TaskStagesProps } from './TaskStages.types';
import { EManagingFirmTaskType, EStageStatus } from 'api/types';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { useUnit } from 'effector-react';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';
import { useHistory } from 'react-router-dom';

export const TaskStages: FC<TaskStagesProps> = ({
  stages,
  handleRevertStage,
  isRevertStageLoading,
  isStageCanBeReverted,
  isEntryPoint,
  task,
}) => {
  const { openCreateResourceDisconnectionModal } = useUnit({
    openCreateResourceDisconnectionModal:
      chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
  });

  const taskType = task.type;

  const stagesView = useMemo(
    () =>
      stages.map((stage, index) => {
        const canRevertStage =
          stages[stage.number]?.status === EStageStatus.InProgress &&
          isStageCanBeReverted;

        return (
          <Stage
            key={stage.id}
            stage={stage}
            isLast={stage.number === stages.length}
            handleRevertStage={handleRevertStage}
            isRevertStageLoading={isRevertStageLoading}
            isShowRevertStageButton={canRevertStage}
          />
        );
      }),
    [stages, handleRevertStage, isRevertStageLoading, isStageCanBeReverted],
  );

  const history = useHistory();

  const isF1Task =
    taskType === EManagingFirmTaskType.HousingDeviceMalfunction ||
    taskType === EManagingFirmTaskType.CalculatorMalfunction;

  return (
    <>
      <Wrapper>
        <TitleWrapper>Этапы выполнения</TitleWrapper>
        {stagesView}
        {isEntryPoint && isF1Task && (
          <>
            <ChooseTypeOfResourceDisconnectionModalContainer />
            <CreateResourceDisconnectionContainer
              handleComplete={() => {
                history.goBack();
              }}
              dateFrom={task.creationTime}
            />
            <DisconnectionWrapper>
              Знаете, что задача сформирована из-за отключения ресурса?
              <MessageButton
                onClick={() => openCreateResourceDisconnectionModal()}
              >
                Сообщить об отключении
              </MessageButton>
            </DisconnectionWrapper>
          </>
        )}
      </Wrapper>
    </>
  );
};
