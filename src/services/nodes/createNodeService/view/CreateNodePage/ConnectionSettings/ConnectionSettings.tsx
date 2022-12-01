import { CreateCalculatorModalContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/CreateCalculatorModalContainer';
import { createCalcuatorService } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/models';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import {
  ConnectionTypeDictionary,
  initialValues,
  validationSchema,
} from './ConnectionSettings.constants';
import {
  CalculatorSelectWrapper,
  CreateCalculatorButtonWrapper,
} from './ConnectionSettings.styled';
import {
  CalculatorConnectionType,
  ConnectionSettingsProps,
} from './ConnectionSettings.types';

const { events } = createCalcuatorService;

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  goPrevStep,
  calculatorsList,
  openCreateCalculatorModal,
}) => {
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema,
  });

  useEffect(
    () =>
      events.newCalculatorCreated.watch(({ id }) =>
        setFieldValue('calculatorId', id)
      ).unsubscribe,
    []
  );

  const isFieldsDisabled =
    values.connectionType !== CalculatorConnectionType.Connected;

  return (
    <>
      <CreateCalculatorModalContainer />
      <div>
        <Title>Настройки соединения</Title>
        <div>
          <FormItem label="Подключение к вычислителю">
            <Select
              placeholder="Выберите"
              value={values.connectionType || undefined}
              onChange={(value) => setFieldValue('connectionType', value)}
            >
              {Object.values(CalculatorConnectionType).map((connectionType) => (
                <Select.Option key={connectionType} value={connectionType}>
                  {ConnectionTypeDictionary[connectionType]}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.connectionType}</ErrorMessage>
          </FormItem>
          <CalculatorSelectWrapper>
            <FormItem label="Вычислитель, к которому подключен узел">
              <Select
                disabled={isFieldsDisabled}
                placeholder="Выберите"
                value={values.calculatorId || undefined}
                onChange={(value) => setFieldValue('calculatorId', value)}
              >
                {calculatorsList?.map((calculator) => (
                  <Select.Option key={calculator.id} value={calculator.id}>
                    {calculator.serialNumber} ({calculator.model})
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage>{errors.calculatorId}</ErrorMessage>
            </FormItem>
            <CreateCalculatorButtonWrapper>
              <LinkButton onClick={openCreateCalculatorModal}>
                + Создать новый вычислитель
              </LinkButton>
            </CreateCalculatorButtonWrapper>
          </CalculatorSelectWrapper>
          <FormItem label="Номер ввода">
            <Select
              disabled={isFieldsDisabled || !values.calculatorId}
              placeholder="Выберите из списка"
              value={values.entryNumber || undefined}
              onChange={(value) => setFieldValue('entryNumber', value)}
            >
              {[1, 2, 3].map((number) => (
                <Select.Option key={number} value={number}>
                  {number}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.entryNumber}</ErrorMessage>
          </FormItem>
        </div>
        <Footer>
          <Button type="ghost" onClick={goPrevStep}>
            Назад
          </Button>
          <Button sidePadding={20} onClick={() => handleSubmit()}>
            Далее
          </Button>
        </Footer>
      </div>
    </>
  );
};
