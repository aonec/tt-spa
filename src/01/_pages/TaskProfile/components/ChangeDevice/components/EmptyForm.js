import React from 'react';
import { Form, Tabs } from 'antd';
import {
  SelectTT, InputTT, DatePickerTT, ButtonTT,
} from '../../../../../tt-components';

const { TabPane } = Tabs;

const EmptyForm = () => {
  console.log('EmptyForm');
  const actionsList = [
    { value: 1, label: 'Замена прибора' },
  ];

  const executorsList = [
    { value: 1, label: 'Константинопольский К.К.' },
  ];

  const tabs = [
    {
      title: 'Шаг 1. Общие данные',
      key: '1',
    },
    {
      title: 'Шаг 2. Настройки соединения',
      key: '2',
    },
    {
      title: 'Шаг 3. Документы',
      key: '3',
    },
  ];

  const TabsComponent = (props) => {
    const { currentTabKey, handleChangeTab } = props;
    return (
      <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
        {tabs.map((currentTab) => {
          const { title, key } = currentTab;
          return (
            <TabPane tab={title} key={key} disabled />
          );
        })}
      </Tabs>
    );
  };

  return (
    <div>
      <form>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: '960px',
        }}
        >
          <Form.Item
            label="Выберите дальнейшее действие"
            style={{ width: 460 }}
          >
            <SelectTT
              options={actionsList}
              defaultValue={1}
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Исполнитель"
            style={{ width: 460 }}
          >
            <SelectTT
              options={executorsList}
              defaultValue={1}
              disabled
            />
          </Form.Item>
        </div>

        <TabsComponent />
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: '960px',
        }}
        >

          <Form.Item
            label="Серийный номер"
            style={{ width: 460 }}
          >
            <InputTT
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Тип прибора"
            style={{ width: 460 }}
          >
            <InputTT
              disabled
            />
          </Form.Item>

          <Form.Item label="Тип ресурса" style={{ width: 460 }}>
            <SelectTT
              disabled
            />
          </Form.Item>

          <Form.Item label="Модель прибора" style={{ width: 460 }}>
            <SelectTT
              disabled
            />
          </Form.Item>

          <Form.Item label="Дата поверки пробора" style={{ width: 460 }}>
            <DatePickerTT
              disabled
            />
          </Form.Item>

          <Form.Item label="Дата следующей поверки пробора" style={{ width: 460 }}>
            <DatePickerTT
              disabled
            />
          </Form.Item>

        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          maxWidth: '960px',
        }}
        >
          <ButtonTT
            color="blue"
            disabled
          >
            Далее
          </ButtonTT>
        </div>
      </form>
    </div>
  );
};

export default EmptyForm;
