import {
  DatePickerNative,
  fromEnter,
} from 'ui-kit/shared_components/DatePickerNative';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { Button } from 'ui-kit/Button';
import {
  AddApartmentActFormik,
  AddNewActFormProps,
} from './AddNewActForm.types';
import {
  ActDate,
  ButtonSC,
  ButtonsWrapper,
  Wrapper,
} from './AddNewActForm.styled';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { ActTypesNamesLookup } from 'dictionaries';
import { actResourceNamesLookup } from 'ui-kit/shared_components/ResourceInfo/ResourceInfo.utils';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { AddressIdSearchContainer } from 'services/actsJournalService/addressIdSearchService';

const dataKey = 'add-new-act';

export const AddNewActForm: FC<AddNewActFormProps> = ({
  addNewAct,
  isCreateLoading,
  actCreated,
}) => {
  const { values, submitForm, setFieldValue, setValues, resetForm } =
    useFormik<AddApartmentActFormik>({
      initialValues: {
        actJobDate: '',
        registryNumber: '',
        actResourceType: null,
        actType: null,
      },
      onSubmit: (values) => {
        const { actResourceType, actType } = values;

        if (!actType || !actResourceType) {
          return;
        }
        addNewAct({ ...values, actType, actResourceType });
      },
    });

  const next = useSwitchInputOnEnter(dataKey, false);

  useEffect(
    () =>
      actCreated.watch(() => {
        setValues({ ...values, actJobDate: '', registryNumber: '' });
        next(-1);
      }).unsubscribe,
    [setValues, actCreated, values, next],
  );

  const handleEnterOnRegistryNumberInput = useCallback(() => {
    if (values.actResourceType) {
      return next(2);
    }
    if (values.actType) {
      return next(1);
    }
    return next(0);
  }, [next, values]);

  const handleEnterOnActTypeSelect = useCallback(() => {
    if (values.actResourceType) {
      return next(2);
    }
    return next(1);
  }, [next, values]);

  return (
    <>
      <Wrapper>
        <ActDate>{moment().format('DD.MM.YYYY')}</ActDate>
        <Input
          small
          value={values.registryNumber || undefined}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFieldValue('registryNumber', e.target.value)
          }
          placeholder="Введите"
          data-reading-input={dataKey}
          onKeyDown={(e) => fromEnter(handleEnterOnRegistryNumberInput)(e)}
        />
        <Select
          data-reading-input={dataKey}
          value={values.actType || undefined}
          onChange={(actType) => setFieldValue('actType', actType)}
          placeholder="Выберите тип документа"
          onKeyDown={(e) => fromEnter(handleEnterOnActTypeSelect)(e)}
          showAction={['focus']}
          small
        >
          {Object.entries(ActTypesNamesLookup).map(([type, value]) => (
            <Select.Option key={type} value={type}>
              {value}
            </Select.Option>
          ))}
        </Select>
        <Select
          data-reading-input={dataKey}
          value={values.actResourceType || undefined}
          onChange={(resourceType) =>
            setFieldValue('actResourceType', resourceType)
          }
          placeholder="Выберите"
          onKeyDown={(e) => fromEnter(() => next(2))(e)}
          showAction={['focus']}
          small
        >
          {Object.entries(actResourceNamesLookup)?.map(([type, value]) => (
            <Select.Option key={type} value={type}>
              {value}
            </Select.Option>
          ))}
        </Select>
        <AddressIdSearchContainer
          dataKey={dataKey}
          onEnter={(index) => {
            next(index + 3);
          }}
        />
        <DatePickerNative
          fullSize
          searchStyle
          value={values.actJobDate}
          onChange={(date) => setFieldValue('actJobDate', date)}
          placeholder="Дата"
          dataKey={dataKey}
        />
      </Wrapper>
      <ButtonsWrapper>
        <Button
          type="ghost"
          size="small"
          onClick={() => {
            resetForm();
          }}
        >
          Сбросить
        </Button>
        <ButtonSC size="small" onClick={submitForm} isLoading={isCreateLoading}>
          Сохранить
        </ButtonSC>
      </ButtonsWrapper>
    </>
  );
};
