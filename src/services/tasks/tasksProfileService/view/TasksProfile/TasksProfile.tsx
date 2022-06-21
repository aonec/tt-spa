import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { TabsSC, Wrapper } from './TasksProfile.styled';
import { TasksProfileProps } from './TasksProfile.types';
const {TabPane} = TabsSC

export const TasksProfile: FC<TasksProfileProps> = ({
  handleExportTasksList,
  grouptype,
}) => {
  const history = useHistory();

  return (
    <Wrapper>
      <PageHeader
        title="Задачи"
        contextMenu={{
          menuButtons: [
            {
              title: 'Выгрузить список задач',
              onClick: handleExportTasksList,
            },
          ],
        }}
      />
      <TabsSC activeKey={grouptype} onChange={history.push}>
        <TabPane tab="К исполнению" key="executing"></TabPane>
        <TabPane tab="Наблюдаемые" key="observing"></TabPane>
        <TabPane tab="Архив" key="archived"></TabPane>
      </TabsSC>
    </Wrapper>
  );
};
