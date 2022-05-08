import React from 'react';
import { $task } from '01/features/tasks/displayTask/models';
import { useStore } from 'effector-react';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { CloseDevicesContainerProps } from './CloseDevicesService.types';
import { CloseDevices } from './components/CloseDevices';

export const CloseDevicesContainer: FC<CloseDevicesContainerProps> = ({
  setData,
}) => {
  const [selectedDevices, setSelectedDevices] = useState<
    { id: number; closingDate: string | null }[]
  >([]);

  const handleDeviceCheboxClicked = (id: number) => {
    setSelectedDevices((prev) => {
      const isSelected = prev.map(({ id }) => id).includes(id);

      if (isSelected) {
        return prev.filter((elem) => elem.id !== id);
      }

      return [...prev, { id, closingDate: null }];
    });
  };

  const onChangeClosingDate = (id: number, closingDate: string) => {
    setSelectedDevices((prev) =>
      prev.map((elem) => {
        if (elem.id !== id) return elem;

        return { ...elem, closingDate };
      })
    );
  };

  useEffect(() => {
    setData({
      deviceCloses: selectedDevices.map(({ id, closingDate }) => ({
        deviceId: id,
        closingDate: moment(closingDate).toISOString(true),
      })),
    });
  }, [selectedDevices]);

  const task = useStore($task);

  const devices = task?.individualDevices;

  return (
    <CloseDevices
      devices={devices}
      onChangeClosingDate={onChangeClosingDate}
      handleDeviceCheboxClicked={handleDeviceCheboxClicked}
      selectedDevices={selectedDevices}
    />
  );
};
