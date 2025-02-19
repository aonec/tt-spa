import { FC } from 'react';
import { ManageButtonsWrapper, Wrapper } from './TasksControls.styled';
import { Props } from './TasksControls.types';
import { Button, Checkbox } from 'antd';
import { CloseBlueIcon } from 'ui-kit/icons';
import { ArrowRepeat } from 'react-bootstrap-icons';

export const TasksControls: FC<Props> = () => {
  return (
    <Wrapper>
      <Checkbox>Выбрать все</Checkbox>
      <ManageButtonsWrapper>
        <Button type="link" icon={<ArrowRepeat />}>
          Передать задачу
        </Button>
        <Button type="link" icon={<CloseBlueIcon />}>
          Закрыть задачу
        </Button>
      </ManageButtonsWrapper>
    </Wrapper>
  );
};
