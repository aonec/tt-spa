import { Loader } from '01/components';
import { AddressIdSearch } from '01/features/addressIdSearch';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { InputSC, SelectSC } from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { ButtonTT } from '01/tt-components';
import { message } from 'antd';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import moment from 'moment';
import { EActResourceType, EActType } from 'myApi';
import React, { ChangeEvent, FC, useCallback, useMemo, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
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

export const AddNewActForm: FC<AddNewActFormProps> = ({
  addNewAct,
  selectAct,
  selectResource,
  selectedActType,
  selectedResourceType,
  clearForm,
}) => {
  const {
    values,
    submitForm,
    setFieldValue,
    resetForm,
  } = useFormik<AddNewActFormT>({
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

  const datePickerRef = useRef(null);

  const pendingRequest = useStore(createApartmentActFx.pending);

  useEffect(
    () =>
      createApartmentActFx.done.watch(() => {
        message.success('Акт успешно добавлен');
        resetForm();
      }).unsubscribe,
    []
  );

  useEffect(
    () =>
      createApartmentActFx.fail.watch(() =>
        message.error('Ошибка при добавлении акта')
      ).unsubscribe,
    []
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
        <InputSC
          value={values.registryNumber || undefined}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFieldValue('registryNumber', e.target.value)
          }
          placeholder="Введите"
          ref={registryNumberRef}
          onKeyDown={handleEnterOnRegistryNumberInput}
        />
        <SelectSC
          value={selectedActType || undefined}
          onChange={(actType) => selectAct(actType as EActType)}
          placeholder="Выберите тип документа"
          ref={documentTypeRef}
          onKeyDown={handleEnterOnActTypeSelect}
        >
          {actTypes?.map((type) => (
            <SelectSC.Option key={type.key} value={type.key!}>
              {type.value}
            </SelectSC.Option>
          ))}
        </SelectSC>
        <SelectSC
          value={selectedResourceType || undefined}
          onChange={(resourceType) =>
            selectResource(resourceType as EActResourceType)
          }
          placeholder="Выберите"
          ref={recourceRef}
          onKeyDown={keyDownEnterGuardedHandler(2)}
        >
          {actResources?.map((type) => (
            <SelectSC.Option key={type.key} value={type.key!}>
              {type.value}
            </SelectSC.Option>
          ))}
        </SelectSC>
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
        <ButtonTT
          color="white"
          small
          onClick={() => {
            clearForm();
            resetForm();
          }}
        >
          Сбросить
        </ButtonTT>
        <Space />
        <ButtonTT
          style={{ padding: '5px 40px' }}
          disabled={pendingRequest}
          color="blue"
          small
          onClick={submitForm}
        >
          {pendingRequest ? (
            <div style={{ transform: 'translate(-8px, 2px)' }}>
              <Loader show />
            </div>
          ) : (
            'Сохранить'
          )}
        </ButtonTT>
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
