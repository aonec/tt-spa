import React, { FC, useMemo } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { LineWrapper } from './CommonDataStep.styled';
import { CommonDataStepProps } from './CommonDataStep.types';
import { EHousingMeteringDeviceType, EPipeNodeConfig } from 'api/types';
import {
  HousingMeteringDeviceDictionary,
  validationSchema,
} from './CommonDataStep.constants';
import { useFormik } from 'formik';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Form } from 'antd';
import { resourceFromConfig } from 'utils/resourceFromConfigLookup';

export const CommonDataStep: FC<CommonDataStepProps> = ({
  configuration,
  updateRequestPayload,
  formId,
  requestPayload,
}) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      housingMeteringDeviceType:
        requestPayload.housingMeteringDeviceType || null,
    },
    onSubmit: (values) => {
      if (!values.housingMeteringDeviceType) return;

      updateRequestPayload({
        housingMeteringDeviceType: values.housingMeteringDeviceType,
      });
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
  });

  const deviceTypesOptions = [
    EHousingMeteringDeviceType.FlowMeter,
    EHousingMeteringDeviceType.TemperatureSensor,
  ].filter(
    (elem) =>
      !(
        configuration === EPipeNodeConfig.ColdWaterSupply &&
        elem === EHousingMeteringDeviceType.TemperatureSensor
      ),
  );

  const resource = useMemo(
    () => resourceFromConfig[configuration],
    [configuration],
  );

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <LineWrapper>
        <FormItem label="Тип ресурса">
          <ResourceSelect resource={resource} disabled />
        </FormItem>
        <FormItem label="Тип прибора">
          <Select
            value={values.housingMeteringDeviceType || undefined}
            onChange={(value) =>
              setFieldValue('housingMeteringDeviceType', value)
            }
            placeholder="Выберите"
          >
            {deviceTypesOptions.map((type) => (
              <Select.Option key={type} value={type}>
                {HousingMeteringDeviceDictionary[type]}
              </Select.Option>
            ))}
          </Select>
          {errors.housingMeteringDeviceType && (
            <ErrorMessage>{errors.housingMeteringDeviceType}</ErrorMessage>
          )}
        </FormItem>
      </LineWrapper>
    </Form>
  );
};
