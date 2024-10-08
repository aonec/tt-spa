import React from 'react';
import { useUnit } from 'effector-react';
import dayjs from 'api/dayjs';
import { FC, useEffect, useState } from 'react';
import { CloseDevicesContainerProps } from './closeDeviceService.types';
import { closeDeviceService } from './closeDevicesService.models';
import { CloseDevices } from './view/CloseDevices';

export const CloseDevicesContainer: FC<CloseDevicesContainerProps> = ({
  handleChange,
}) => {
  const [selectedDevices, setSelectedDevices] = useState<
    { id: number; closingDate: string | null }[]
  >([]);

  const handleDeviceCheckboxClicked = (id: number) => {
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
      }),
    );
  };

  useEffect(() => {
    handleChange({
      deviceCloses: selectedDevices.map(({ id, closingDate }) => ({
        deviceId: id,
        closingDate: dayjs(closingDate).format(),
      })),
    });
  }, [selectedDevices, handleChange]);

  const { individualDevices } = useUnit({
    individualDevices: closeDeviceService.outputs.$individualDevices,
  });

  return (
    <CloseDevices
      devices={individualDevices}
      onChangeClosingDate={onChangeClosingDate}
      handleDeviceCheckboxClicked={handleDeviceCheckboxClicked}
      selectedDevices={selectedDevices}
    />
  );
};
