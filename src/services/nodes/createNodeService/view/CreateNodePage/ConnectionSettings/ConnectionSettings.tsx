import { useFormik } from 'formik';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import {
  ConnectionTypeDictionary,
  initialValues,
} from './ConnectionSettings.constants';
import {
  CalculatorSelectWrapper,
  CreateCalculatorButtonWrapper,
} from './ConnectionSettings.styled';
import {
  CalculatorConnectionType,
  ConnectionSettingsProps,
} from './ConnectionSettings.types';

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  goPrevStep,
  calculatorsList,
}) => {
  const { values, setFieldValue, handleChange } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const isFieldsDisabled =
    values.connectionType !== CalculatorConnectionType.Connected;

  return (
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
          </FormItem>
          <CreateCalculatorButtonWrapper>
            <LinkButton onClick={() => {}}>
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
        </FormItem>
      </div>
      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20}>Далее</Button>
      </Footer>
    </div>
  );
};
