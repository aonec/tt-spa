import { AddressIdSearch } from '01/features/addressIdSearch';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { message } from 'antd';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import moment from 'moment';
import { EActResourceType, EActType } from 'myApi';
import React, { ChangeEvent, FC, useMemo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import {
  $actResources,
  ActResourcesGate,
} from '../../../displayActResources/models';
import {
  $actTypes,
  ApartmentActTypesGate,
} from '../../../displayActTypes/models';
import { createApartmentActFx } from '../../models';
import { gridTemp } from '../TableHeader';
import { AddNewActFormProps, AddNewActFormT } from './AddNewActForm.types';
import { ButtonSC } from './AddNewActForm.styled';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';

export const AddNewActForm: FC<AddNewActFormProps> = ({
  addNewAct,
  selectAct,
  selectResource,
  selectedActType,
  selectedResourceType,
  clearForm,
}) => {
  const { values, submitForm, setFieldValue, resetForm } =
    useFormik<AddNewActFormT>({
      initialValues: {
        actJobDate: '',
        registryNumber: '',
      },
      onSubmit: (formValues) => {
        const actType = selectedActType;
        const actResourceType = selectedResourceType;

        if (actType && actResourceType) {
          addNewAct({ ...formValues, actType, actResourceType });
        }
      },
    });

  const {
    keyDownEnterGuardedHandler,
    refs: [registryNumberRef, documentTypeRef, recourceRef, addressRef],
  } = useOnEnterSwitch(4);

  const actTypes = useStore($actTypes);
  const actResources = useStore($actResources);

  const pendingRequest = useStore(createApartmentActFx.pending);

  useEffect(
    () =>
      createApartmentActFx.done.watch(() => {
        message.success('Акт успешно добавлен');
        resetForm();
      }).unsubscribe,
    [resetForm],
  );

  useEffect(
    () =>
      createApartmentActFx.fail.watch(() =>
        message.error('Ошибка при добавлении акта'),
      ).unsubscribe,
    [],
  );

  const handleEnterOnRegistryNumberInput = useMemo(() => {
    if (selectedResourceType && selectedActType) {
      return keyDownEnterGuardedHandler(2);
    }
    if (selectedActType) {
      return keyDownEnterGuardedHandler(1);
    }
    return keyDownEnterGuardedHandler(0);
  }, [keyDownEnterGuardedHandler, selectedActType, selectedResourceType]);

  const handleEnterOnActTypeSelect = useMemo(() => {
    if (selectedResourceType) {
      return keyDownEnterGuardedHandler(2);
    }
    return keyDownEnterGuardedHandler(1);
  }, [keyDownEnterGuardedHandler, selectedResourceType]);

  return (
    <>
      <ApartmentActTypesGate />
      <ActResourcesGate />
      <Wrap temp={gridTemp} gap="15px">
        <DocDate>{moment().format('DD.MM.YYYY')}</DocDate>
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
          value={selectedActType || undefined}
          onChange={(actType) => selectAct(actType as EActType)}
          placeholder="Выберите тип документа"
          ref={documentTypeRef}
          onKeyDown={handleEnterOnActTypeSelect}
          small
        >
          {actTypes?.map((type) => (
            <Select.Option key={type.key} value={type.key!}>
              {type.value}
            </Select.Option>
          ))}
        </Select>
        <Select
          value={selectedResourceType || undefined}
          onChange={(resourceType) =>
            selectResource(resourceType as EActResourceType)
          }
          placeholder="Выберите"
          ref={recourceRef}
          onKeyDown={keyDownEnterGuardedHandler(2)}
          small
        >
          {actResources?.map((type) => (
            <Select.Option key={type.key} value={type.key!}>
              {type.value}
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
      </Wrap>
      <ButtonWrap>
        <Button
          type="ghost"
          size="small"
          onClick={() => {
            clearForm();
            resetForm();
          }}
        >
          Сбросить
        </Button>
        <Space />
        <ButtonSC size="small" onClick={submitForm} isLoading={pendingRequest}>
          Сохранить
        </ButtonSC>
      </ButtonWrap>
      <SpaceLine />
    </>
  );
};

const Wrap = styled(Grid)`
  padding: 0px 0 0 15px;
  align-items: center;
`;

const ButtonWrap = styled.div`
  padding: 15px 0 0 15px;
  display: flex;
  justify-content: flex-end;
`;

export const DocDate = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: bold;
  font-size: 14px;
`;
