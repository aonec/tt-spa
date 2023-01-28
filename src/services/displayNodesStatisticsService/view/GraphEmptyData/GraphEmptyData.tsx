import { Empty } from 'antd';
import React, { FC } from 'react';
import { FallbackGraphIcon } from 'ui-kit/icons';

export const GraphEmptyData: FC = () => {
  return (
    <Empty
      description="Нет данных за выбранный период. Пожалуйста, измените период для формирования новой статистики."
      image={<FallbackGraphIcon />}
      imageStyle={{ height: '400px' }}
      style={{ textAlign: 'start', color: '#272f5a' }}
    />
  );
};
