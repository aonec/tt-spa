import { FC } from 'react';
import { ManageButtonsWrapper, Wrapper } from './TasksControls.styled';
import { Props } from './TasksControls.types';
import { Button, Checkbox } from 'antd';
import { ArrowRepeat, XLg } from 'react-bootstrap-icons';

export const TasksControls: FC<Props> = ({
  selectedTasks,
  setSelectedTasks,
  tasks,
  handleCloseTasks,
  handleReassignTasks,
}) => {
  const isAllChecked =
    selectedTasks.length === tasks.length && tasks.length > 0;

  return (
    <Wrapper>
      <Checkbox
        checked={isAllChecked}
        onChange={(e) => {
          const isChecked = e.target.checked;

          if (isChecked) {
            setSelectedTasks(tasks.map((task) => task.id));
          } else {
            setSelectedTasks([]);
          }
        }}
      >
        Выбрать все
      </Checkbox>
      <ManageButtonsWrapper>
        <Button
          onClick={handleReassignTasks}
          disabled={!selectedTasks.length}
          type="link"
          icon={<ArrowRepeat />}
        >
          Передать задачи
        </Button>
        <Button
          onClick={handleCloseTasks}
          disabled={!selectedTasks.length}
          type="link"
          icon={<XLg />}
        >
          Закрыть задачи
        </Button>
      </ManageButtonsWrapper>
    </Wrapper>
  );
};
