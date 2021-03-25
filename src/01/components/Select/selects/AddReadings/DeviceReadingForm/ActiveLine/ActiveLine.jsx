import React from 'react';
import { Badge } from 'antd';

const ActiveLine = ({ isActive }) => {
  return (
    <div
      style={{
        marginLeft: 4,
        marginRight: 16,
        color: 'rgba(39, 47, 90, 0.8)',
      }}
    >
      {isActive ? (
        <Badge status="success" text="Активен" />
      ) : (
        <Badge status="error" text="Не активен" />
      )}
    </div>
  );
};

export default ActiveLine;
