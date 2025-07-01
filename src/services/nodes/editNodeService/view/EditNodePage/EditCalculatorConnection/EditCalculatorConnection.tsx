import React, { FC } from 'react';
import {
  AlertContentWrapper,
  FooterWrapper,
  FormWrapper,
  LinkSC,
  OpenCreateCalculatorText,
  Wrapper,
} from './EditCalculatorConnection.styled';
import { AddCalculatorConnectionProps } from './EditCalculatorConnection.types';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Button } from 'ui-kit/Button';
import { Alert } from 'ui-kit/Alert';
import { validationSchema } from './EditCalculatorConnection.constants';
import { UpdatePipeNodeRequest } from 'api/types';
import { useNavigate } from 'react-router-dom';
import { RemoveConnectionConfirmModalContainer } from '../removeConnectionService';

const calculatorConnectionInputNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const EditCalculatorConnection: FC<AddCalculatorConnectionProps> = ({
  calculators,
  node,
  handleUpdateNodeConnection,
  handleOpenCreateCalculatorModal,
  isLoading,
  openRemoveConnectionModal,
}) => {
  const navigate = useNavigate();

  const { values, handleSubmit, setFieldValue, errors } = useFormik<
    Partial<UpdatePipeNodeRequest>
  >({
    initialValues: {
      calculatorId: node?.calculatorId || undefined,
      entryNumber: node?.entryNumber || undefined,
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const { calculatorId, entryNumber } = values;
      if (calculatorId === 0) {
        return openRemoveConnectionModal();
      }
      if (!calculatorId || !entryNumber) {
        return;
      }
      handleUpdateNodeConnection({ calculatorId, entryNumber });
    },
  });

  return (
    <>
      <RemoveConnectionConfirmModalContainer />
      {node?.calculatorId && (
        <Alert icon="info">
          <AlertContentWrapper>
            <span>
              В профиле узла доступно только редактирование номера ввода
              вычислителя. Чтобы отредактировать другие параметры вычислителя,
              перейдите в профиль прибора.
            </span>
            <LinkSC to={`/calculators/${node?.calculatorId}/profile`}>
              Перейти
            </LinkSC>
          </AlertContentWrapper>
        </Alert>
      )}
      <FormWrapper>
        <FormItem label="Вычислитель, к которому подключен узел">
          <Wrapper>
            <div>
              <Select
                placeholder="Серийный номер или IP адрес"
                value={values.calculatorId || undefined}
                onChange={(calculatorId) => {
                  setFieldValue('calculatorId', calculatorId);
                }}
              >
                <Select.Option value={0}>Отсутствует</Select.Option>
                {calculators?.map((calculator) => (
                  <Select.Option key={calculator.id} value={calculator.id}>
                    {calculator.serialNumber} ({calculator.model})
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage>{errors.calculatorId}</ErrorMessage>
            </div>
            <OpenCreateCalculatorText onClick={handleOpenCreateCalculatorModal}>
              + Создать новый вычислитель
            </OpenCreateCalculatorText>
          </Wrapper>
        </FormItem>
        <FormItem label="Номер ввода">
          <Wrapper>
            <Select
              disabled={!values.calculatorId}
              placeholder="Выберите номер ввода"
              value={values.entryNumber || undefined}
              onChange={(entryNumber) =>
                setFieldValue('entryNumber', entryNumber)
              }
            >
              {calculatorConnectionInputNumbers.map((value) => (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Wrapper>
          <ErrorMessage>{errors.entryNumber}</ErrorMessage>
        </FormItem>
      </FormWrapper>
      <FooterWrapper>
        <Button type="ghost" onClick={() => navigate(-1)}>
          Отмена
        </Button>

        <Button isLoading={isLoading} onClick={() => handleSubmit()}>
          Сохранить
        </Button>
      </FooterWrapper>
    </>
  );
};
