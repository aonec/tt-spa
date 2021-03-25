import React from 'react';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import { Icon } from '../../../../_components/Icon';
import styles from '../../../Devices/components/DeviceSearchForm/DeviceSearchForm.module.scss';
import { setTaskType, setTaskId } from './tasksSearchReducer';

const TasksSearchForm = ({ searchState, dispatchSearchState }) => {
  const onValuesChangeHandler = (changedValues) => {
    const targetValue = Object.values(changedValues)[0];
    dispatchSearchState(setTaskId(targetValue));
  };

  const handleOnSortChange = (value) => {
    dispatchSearchState(setTaskType(value));
    // dispatch(setCurrentPage(1));
  };

  const TaskTypeList = [
    { value: 0, label: 'Показать все' },
    { value: 1, label: 'Неполадки с вычислителем' },
    { value: 2, label: 'Неполадки с ОДПУ' },
    { value: 3, label: 'Отсутствие подключения с вычислителем' },
    { value: 4, label: 'Проверка ИПУ' },
  ];

  return (
    <Form
      id="searchForm"
      initialValues={{ remember: true }}
      onValuesChange={onValuesChangeHandler}
      style={{ margin: '20px auto' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 7fr 4.5fr',
        }}
      >
        <Form.Item name="advancedButton" style={{ marginRight: 16 }}>
          <Tooltip title="Расширенный поиск">
            <Button
              type="secondary"
              shape="square"
              icon={<Icon icon="filter" />}
              disabled
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          name="TaskId"
          rules={[{ required: true, message: 'Введите номер задачи' }]}
          style={{ marginRight: 16 }}
        >
          <Input
            className={styles.input}
            value={searchState.taskId}
            placeholder="Номер задачи"
          />
        </Form.Item>

        <Form.Item name="sortByTaskType">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label
              htmlFor="sortByTaskType"
              style={{ minWidth: 85, marginRight: 8 }}
            >
              Тип задачи:
            </label>
            <Select
              id="sortByTaskType"
              options={TaskTypeList}
              defaultValue={0}
              onSelect={handleOnSortChange}
            />
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default TasksSearchForm;
