import React, { FC, useCallback } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Descriprion,
  FormWrapper,
  OneValueWrapper,
} from './EditDeviationModal.styled';
import { EditDeviationModalProps } from './EditDeviationModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Form } from 'antd';

const formId = 'Edit-Deviation-Form';

export const EditDeviationModal: FC<EditDeviationModalProps> = ({
  isOpen,
  setModalOpen,
  temperatureLimits,
  handleEdit,
}) => {
  const { values, setFieldValue, handleSubmit, isValid, resetForm } = useFormik(
    {
      initialValues: { min: null, max: null },
      onSubmit: ({ max, min }) => {
        handleEdit({
          downTemperatureDeviationPercentLimit: max,
          upTemperatureDeviationPercentLimit: min,
        });
        resetForm();
      },
      validationSchema: Yup.object().shape({
        min: Yup.number().required(),
        max: Yup.number().required(),
      }),
    },
  );

  const setModalOpenMemoized = useCallback(
    (data: boolean) => setModalOpen(data),
    [setModalOpen],
  );
  const handleSubmitMemoized = useCallback(
    () => handleSubmit(),
    [handleSubmit],
  );

  return (
    <FormModal
      title="Min и max отклонение температуры"
      visible={isOpen}
      onCancel={() => setModalOpenMemoized(false)}
      formId={formId}
      submitBtnText="Сохранить изменения"
      disabled={!isValid}
      form={
        <Form id={formId} onSubmitCapture={() => handleSubmitMemoized()}>
          <Descriprion>
            Данные значения будут использоваться в алгоритме для выявления
            перетопов и недотопов на узлах.
          </Descriprion>

          <FormWrapper>
            <OneValueWrapper>
              <FormItem label="Текущее min значение">
                <Input value={temperatureLimits.min || undefined} disabled />
              </FormItem>
              <FormItem label="Новое min значение">
                <Input
                  type="number"
                  placeholder="Введите"
                  value={values.min || undefined}
                  onChange={(value) => setFieldValue('min', value.target.value)}
                />
              </FormItem>
            </OneValueWrapper>

            <OneValueWrapper>
              <FormItem label="Текущее max значение">
                <Input value={temperatureLimits.max || undefined} disabled />
              </FormItem>
              <FormItem label="Новое max значение">
                <Input
                  type="number"
                  placeholder="Введите"
                  value={values.max || undefined}
                  onChange={(value) => setFieldValue('max', value.target.value)}
                />
              </FormItem>
            </OneValueWrapper>
          </FormWrapper>
        </Form>
      }
    />
  );
};
