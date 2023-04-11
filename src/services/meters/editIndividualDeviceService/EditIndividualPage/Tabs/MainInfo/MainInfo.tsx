import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Wrapper } from './MainInfo.styled';
import { MainInfoProps } from './MainInfo.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { UpdateIndividualDeviceRequest } from 'myApi';
import moment from 'moment';

export const MainInfo: FC<MainInfoProps> = ({
  individualDevice,
  handleUpdateDevice,
}) => {
  const {
    address,
    id,
    model,
    serialNumber,
    lastCheckingDate,
    futureCheckingDate,
    resource,
    mountPlace,
    bitDepth,
    scaleFactor,
    sealInstallationDate,
    deviceMountPlace,
    isPolling,
    sealNumber,
  } = individualDevice;

  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      resource: resource,
      model: model,
      serialNumber: serialNumber,
      mountPlaceId: deviceMountPlace?.id,
      bitDepth: bitDepth,
      scaleFactor: scaleFactor,
      isPolling: isPolling,
      lastCheckingDate: lastCheckingDate ? moment(lastCheckingDate) : null,
      futureCheckingDate: futureCheckingDate
        ? moment(futureCheckingDate)
        : null,
      sealNumber: sealNumber,
      sealInstallationDate: sealInstallationDate
        ? moment(sealInstallationDate)
        : null,
    },
    validationSchema: yup.object().shape({
      serialNumber: yup.string().required('Это поле обязательно'),
      lastCheckingDate: yup.string().required('Это поле обязательно'),
      futureCheckingDate: yup.string().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      const payload: UpdateIndividualDeviceRequest = {
        serialNumber: data.serialNumber,
        resource: data.resource,
        model: data.model,
        bitDepth: data.bitDepth,
        scaleFactor: data.scaleFactor,
        sealNumber: data.sealNumber,
        sealInstallationDate: moment(
          data.sealInstallationDate,
          'DD.MM.YYYY',
        ).toISOString(true),
        mountPlaceId: data.mountPlaceId,
        isPolling: data.isPolling,
      };

      handleUpdateDevice(payload);
    },
  });
  return (
    <Wrapper>
      <FormItem label="Тип ресурса">
        <Select value={values.resource} disabled />
      </FormItem>
    </Wrapper>
  );
};
