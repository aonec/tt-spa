import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Wrapper } from './TransferDevicesStage.styled';
import { TransferDevicesStageProps } from './TransferDevicesStage.types';
import { IndividualDeviceItem } from './IndividualDeviceItem';

export const TransferDevicesStage: FC<TransferDevicesStageProps> = ({
  individualDevices,
  transferDevicesData,
  handleSubmitTransferDevicesStage,
  formId,
}) => {
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      individualDeviceIdsForSwitch:
        transferDevicesData?.individualDeviceIdsForSwitch || [],
    },

    enableReinitialize: true,
    onSubmit: (data) => {
      const { individualDeviceIdsForSwitch } = data;
      handleSubmitTransferDevicesStage({ individualDeviceIdsForSwitch });
    },
  });

  const chooseDevice = (id: number) => {
    const isChosenDevice = values.individualDeviceIdsForSwitch.includes(id);

    if (isChosenDevice) {
      setFieldValue(
        'individualDeviceIdsForSwitch',
        values.individualDeviceIdsForSwitch.filter(
          (chosenId) => chosenId !== id,
        ),
      );
    } else {
      setFieldValue('individualDeviceIdsForSwitch', [
        ...values.individualDeviceIdsForSwitch,
        id,
      ]);
    }
  };

  return (
    <Wrapper onSubmitCapture={handleSubmit} id={formId}>
      {individualDevices?.items.map((device) => (
        <IndividualDeviceItem
          key={device.id}
          device={device}
          isSelected={values.individualDeviceIdsForSwitch.includes(device.id)}
          chooseDevice={chooseDevice}
        />
      ))}
    </Wrapper>
  );
};
