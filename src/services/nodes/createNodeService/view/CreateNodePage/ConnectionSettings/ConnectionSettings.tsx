import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useFormik } from 'formik';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import {
  ConnectionTypeDictionary,
  validationSchema,
} from './ConnectionSettings.constants';
import { connectionSettingsService } from './ConnectionSettings.model';
import {
  ButtonSC,
  CalculatorModel,
  CalculatorSelectWrapper,
  CalculatorSerialNumber,
  CreateCalculatorButtonWrapper,
  FormItemSC,
} from './ConnectionSettings.styled';
import {
  CalculatorConnectionType,
  ConnectionSettingsProps,
} from './ConnectionSettings.types';
import { SelectValue } from 'antd/lib/select';
import { SelectedEntityPanel } from 'ui-kit/shared/SelectedEntityPanel';
import { CalculatorIcon } from 'ui-kit/icons';

const { inputs, outputs } = connectionSettingsService;

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  goPrevStep,
  calculatorsList,
  openCreateCalculatorModal,
  updateRequestPayload,
  requestPayload,
}) => {
  const connectionType = useStore(outputs.$connectionType);

  const setConnectionType = useEvent(inputs.setConnectionType);

  const initialValues = useMemo(() => {
    return {
      connectionType: connectionType,
      calculatorId: requestPayload.calculatorId || null,
      entryNumber: requestPayload.entryNumber || null,
    };
  }, [requestPayload, connectionType]);

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      const isNoConnection =
        values.connectionType === CalculatorConnectionType.NoConnection;

      if (isNoConnection) {
        updateRequestPayload({
          calculatorId: null,
          entryNumber: null,
        });
        return;
      }

      updateRequestPayload({
        calculatorId: values.calculatorId,
        entryNumber: values.entryNumber,
      });
    },
    validationSchema,
    validateOnChange: false,
    enableReinitialize: true,
  });

  useEffect(
    () =>
      inputs.newCalculatorCreated.watch(({ id }) =>
        setFieldValue('calculatorId', id),
      ).unsubscribe,
    [setFieldValue],
  );

  const isFieldsDisabled =
    values.connectionType !== CalculatorConnectionType.Connected;

  useEffect(() => {
    if (values.connectionType && values.connectionType !== connectionType) {
      setConnectionType(values.connectionType);
    }
  }, [values.connectionType, connectionType, setConnectionType]);

  const handleChangeConnectionType = useCallback(
    async (value: SelectValue) => {
      await setFieldValue('connectionType', value);

      if (value === CalculatorConnectionType.NoConnection) {
        handleSubmit();
      }
    },
    [handleSubmit, setFieldValue],
  );

  const selectedCalculator = useMemo(() => {
    if (!values.calculatorId || !calculatorsList?.length) return null;

    return (
      calculatorsList.find(
        (calculator) => calculator.id === values.calculatorId,
      ) || null
    );
  }, [values.calculatorId, calculatorsList]);

  return (
    <div>
      <Title>Настройки соединения</Title>
      <div>
        <FormItem label="Подключение к вычислителю">
          <Select
            placeholder="Выберите"
            value={values.connectionType || undefined}
            onChange={handleChangeConnectionType}
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
          <FormItemSC
            isWide={Boolean(selectedCalculator)}
            label="Вычислитель, к которому подключен узел"
          >
            {!selectedCalculator && (
              <>
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
              </>
            )}
            {selectedCalculator && (
              <SelectedEntityPanel
                onRemove={() => setFieldValue('calculatorId', null)}
              >
                <CalculatorIcon />
                <CalculatorSerialNumber>
                  {selectedCalculator.serialNumber}
                </CalculatorSerialNumber>
                <CalculatorModel>({selectedCalculator.model})</CalculatorModel>
              </SelectedEntityPanel>
            )}
          </FormItemSC>
          {!selectedCalculator && (
            <CreateCalculatorButtonWrapper>
              <LinkButton onClick={openCreateCalculatorModal}>
                + Создать новый вычислитель
              </LinkButton>
            </CreateCalculatorButtonWrapper>
          )}
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
        <ButtonSC onClick={() => handleSubmit()}>Далее</ButtonSC>
      </Footer>
    </div>
  );
};
