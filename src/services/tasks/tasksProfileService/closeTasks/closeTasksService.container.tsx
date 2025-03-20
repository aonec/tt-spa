import { useUnit } from 'effector-react';
import { closeTasksService } from './closeTasksService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { tasksProfileService } from '../tasksProfileService.model';
import { closeTasksMutation } from './closeTasksService.api';
import { Wrapper } from './closeTasksService.styled';
import { useMemo } from 'react';
import { Table } from 'ui-kit/Table';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

const { inputs, outputs } = closeTasksService;

export const CloseTasksContainer = () => {
  const {
    isOpen,
    closeModal,
    selectedTasks,
    handleCloseTasks,
    closeResults,
    isLoading,
  } = useUnit({
    isOpen: outputs.$isCloseTasksModalOpen,
    closeModal: inputs.closeModal,
    selectedTasks: tasksProfileService.outputs.$selectedTasks,
    handleCloseTasks: closeTasksMutation.start,
    closeResults: outputs.$closeResults,
    isLoading: closeTasksMutation.$pending,
  });

  const resultArr = useMemo(
    () =>
      closeResults?.filter(
        (elem) => !elem.isSuccess && elem.errorDescription,
      ) || [],
    [closeResults],
  );

  const isResultExist = resultArr.length > 0;

  return (
    <FormModal
      formId="close-tasks-modal"
      visible={isOpen}
      title={
        isResultExist
          ? 'Некоторые задачи не закрыты'
          : 'Вы уверены, что хотите закрыть задачи?'
      }
      submitBtnText="Закрыть задачи"
      disabled={isResultExist}
      loading={isLoading}
      form={
        <>
          {!isResultExist && (
            <Wrapper>
              <strong>Выбрано задач: {selectedTasks.length}</strong>
              Задачи будут закрыты принудительно, это означает, что задачи
              перейдут в архив без исполнения со специальным статусом. Задачи не
              будут удалены.
            </Wrapper>
          )}
          {isResultExist && (
            <Wrapper>
              <Table
                elements={resultArr}
                columns={[
                  {
                    label: '№',
                    size: '100px',
                    render: (elem) => elem.id,
                  },
                  {
                    label: 'описание',
                    size: '480px',
                    render: (elem) => elem.errorDescription,
                  },
                  {
                    label: '',
                    size: '120px',
                    render: (elem) => (
                      <NavLink target="_blank" to={`/tasks/profile/${elem.id}`}>
                        <Button type="link">Перейти</Button>
                      </NavLink>
                    ),
                  },
                ]}
              />
            </Wrapper>
          )}
        </>
      }
      onCancel={closeModal}
      onSubmit={() => handleCloseTasks({ taskIds: selectedTasks })}
      submitButtonType="danger"
    />
  );
};
