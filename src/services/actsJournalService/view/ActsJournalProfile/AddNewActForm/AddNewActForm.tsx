import { AddressIdSearch } from '01/features/addressIdSearch';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { ChangeEvent, FC, useEffect, useMemo } from 'react';
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

  const {
    keyDownEnterGuardedHandler,
    refs: [registryNumberRef, documentTypeRef, recourceRef, addressRef],
  } = useOnEnterSwitch(4);

  useEffect(
    () =>
      actCreated.watch(() => {
        setValues({ ...values, actJobDate: '', registryNumber: '' });
        if (registryNumberRef.current.focus) {
          registryNumberRef.current.focus();
        }
      }).unsubscribe,
    [setValues, actCreated, values, registryNumberRef],
  );

  const handleEnterOnRegistryNumberInput = useMemo(() => {
    if (values.actResourceType) {
      return keyDownEnterGuardedHandler(2);
    }
    if (values.actType) {
      return keyDownEnterGuardedHandler(1);
    }
    return keyDownEnterGuardedHandler(0);
  }, [keyDownEnterGuardedHandler, values]);

  const handleEnterOnActTypeSelect = useMemo(() => {
    if (values.actResourceType) {
      return keyDownEnterGuardedHandler(2);
    }
    return keyDownEnterGuardedHandler(1);
  }, [keyDownEnterGuardedHandler, values]);

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
          ref={registryNumberRef}
          onKeyDown={handleEnterOnRegistryNumberInput}
        />
        <Select
          value={values.actType || undefined}
          onChange={(actType) => setFieldValue('actType', actType)}
          placeholder="Выберите тип документа"
          ref={documentTypeRef}
          onKeyDown={handleEnterOnActTypeSelect}
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
          value={values.actResourceType || undefined}
          onChange={(resourceType) =>
            setFieldValue('actResourceType', resourceType)
          }
          placeholder="Выберите"
          ref={recourceRef}
          onKeyDown={keyDownEnterGuardedHandler(2)}
          showAction={['focus']}
          small
        >
          {Object.entries(actResourceNamesLookup)?.map(([type, value]) => (
            <Select.Option key={type} value={type}>
              {value}
            </Select.Option>
          ))}
        </Select>
        <AddressIdSearch
          firstInputRef={addressRef}
          onExit={() => {
            document.getElementById('act-journal-date-picker')?.focus();
          }}
        />
        <DatePickerNative
          fullSize
          searchStyle
          value={values.actJobDate}
          onChange={(date) => setFieldValue('actJobDate', date)}
          placeholder="Дата"
          id="act-journal-date-picker"
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
