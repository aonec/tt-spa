import React from 'react';
import { Badge } from 'antd';
import { closingReasons } from '01/features/individualDevices/switchIndividualDevice/components/stages/BaseInfoStage';

const ActiveLine = ({ isActive, closingReason }) => {
  return (
    <div
      style={{
        marginLeft: 4,
        marginRight: 16,
        color: 'rgba(39, 47, 90, 0.8)',
        witeSpace: 'nowrap',
      }}
    >
      {isActive ? (
        <Badge status="success" text="Активен" />
      ) : (
        <Badge
          style={{ witeSpace: 'nowrap' }}
          status="error"
          text={`Закрыт${
            closingReasons && closingReasons[closingReason]
              ? ` (${closingReasons[closingReason]})`
              : ''
          }`}
        />
      )}
    </div>
  );
};

export default ActiveLine;
