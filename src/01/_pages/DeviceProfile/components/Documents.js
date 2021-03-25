import React, { useState } from 'react';
const columns = [
  {
    title: 'Месяц',
    dataIndex: 'month',
    key: 'month',
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Показания',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: 'Потребление',
    dataIndex: 'use',
    key: 'use',
  },
  {
    title: 'Оператор',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'Дата и время',
    dataIndex: 'dateandtime',
    key: 'dateandtime',
  },
];

const data = [
  {
    month: 'Февраль 2020',
    data: 'Тариф 1',
    use: '0 м',
    operator: 'Константинопольский К.К.',
    dateandtime: '24 марта 2020 14:34',
  },
  {
    month: 'Февраль 2020',
    data: 'Тариф 1',
    use: '123 КВт/ч',
    operator: 'Константинопольский К.К.',
    dateandtime: '24 марта 2020 14:34',
  },
  {
    month: 'Февраль 2020',
    data: 'Тариф 1',
    use: '123 КВт/ч',
    operator: 'Константинопольский К.К.',
    dateandtime: '24 марта 2020 14:34',
  },
];

export const Documents = () => {
  const [state, setState] = useState();
  return (
    <>
      <h2>Компонент Документы в процессе разработки</h2>
      <button>Test</button>
    </>
  );
};
