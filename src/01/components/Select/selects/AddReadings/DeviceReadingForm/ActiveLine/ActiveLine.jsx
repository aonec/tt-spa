import React, { useMemo } from 'react';
import { Badge } from 'antd';
import { closingReasons } from '01/features/individualDevices/switchIndividualDevice/components/stages/BaseInfoStage';

const ActiveLine = ({ isActive, closingReason }) => {
  const badge = useMemo(() => {
    if (isActive) return <Badge status="success" text="Активен" />;

    const closingReasonText = `Закрыт${
      closingReasons && closingReasons[closingReason]
        ? ` (${closingReasons[closingReason]})`
        : ''
    }`;

    return (
      <Badge
        style={{ witeSpace: 'nowrap' }}
        status="error"
        text={closingReasonText}
      />
    );
  }, [isActive, closingReason]);

  return (
    <div
      style={{
        marginLeft: 4,
        marginRight: 16,
        color: 'rgba(39, 47, 90, 0.8)',
        witeSpace: 'nowrap',
      }}
    >
      {badge}
    </div>
  );
};

export default ActiveLine;
