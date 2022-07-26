/* eslint-disable */

import React, { useMemo, useReducer } from 'react';
import styled from '@reshadow/macro';
import { NavLink } from 'react-router-dom';

import { tabs } from '01/r_comp';

import { useTasks } from './useTasks';
import { TasksList } from './components/TasksList';
import TasksSearchForm from './components/TasksSearchForm/TasksSearchForm';
import tasksSearchReducer from './components/TasksSearchForm/tasksSearchReducer';
import { useDebounce } from '../../hooks/useDebounce';
import getAccessesList from '../../_api/utils/getAccessesList';
import { PageHeader } from '01/shared/ui/PageHeader';
import { TasksListWrapper, Wrapper } from './Tasks.styled';

import {
  ExportTasksListModalContainer,
  exportTasksListService,
} from 'services/tasks/exportTasksListService';
import { useEvent } from 'effector-react';

const tabItems = [
  ['К исполнению', 'executing'],
  ['Наблюдаемые', 'observing'],
  ['Архив', 'archived'],
];

const tabItemsWatcher = [
  ['К исполнению', 'executing'],
  ['Наблюдаемые', 'observing'],
  ['Архив', 'archived'],
];

export const Tasks = () => {
  const access = getAccessesList();
  const { show } = access;
  const resultTabs = show('CalculatorUpdate') ? tabItems : tabItemsWatcher;

  const Tabs = React.memo(({ total = [] }) => {
    return styled(tabs)(
      <tabs>
        {resultTabs.map(({ 0: name, 1: to }, i) => {
          return (
            <NavLink key={to} to={to} activeClassName={tabs.active} replace>
              {name} {!!total[i] && `(${total[i]})`}
            </NavLink>
          );
        })}
      </tabs>
    );
  });

  const [searchState, dispatchSearchState] = useReducer(tasksSearchReducer, {});

  const debouncedSearchState = useDebounce(searchState, 500);

  const { items, executingTasksCount, observingTasksCount } = useTasks(
    debouncedSearchState
  );

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.openModal
  );


  const header = useMemo(
    () => (
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
    ),
    [handleExportTasksList]
  );

  const taskList = useMemo(() => <TasksList items={items} />, [items]);

  return (
    <>
      <ExportTasksListModalContainer />
      <Wrapper>
        {header}
        <TasksListWrapper>
          <Tabs total={[executingTasksCount, observingTasksCount]} />
          <TasksSearchForm
            searchState={searchState}
            dispatchSearchState={dispatchSearchState}
          />
          {taskList}
        </TasksListWrapper>
      </Wrapper>
    </>
  );
};
