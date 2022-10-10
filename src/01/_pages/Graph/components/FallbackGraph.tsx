import { Alert } from 'antd';
import React from 'react';
import FallbackGraphIcon from '../assets/FallbackGraph.svg';

export const FallbackGraph = () => {
  return (
    <>
      <Alert
        message="Ошибка"
        description="Нет данных за выбранный период. Пожалуйста, измените период для формирования новой статистики."
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
      <div>
        <img src={FallbackGraphIcon} alt="546" />
      </div>
    </>
  );
};
