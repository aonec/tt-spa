import { DatePickerNative } from '../../../../shared/ui/DatePickerNative';
import { message } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React, { ChangeEvent, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import {
  $actResources,
  ActResourcesGate,
} from '../../displayActResources/models';
import { $actTypes, ApartmentActTypesGate } from '../../displayActTypes/models';
import {
  clearCreationActFormValues,
  createActForm,
  createApartmentActFx,
} from '../models';
import { gridTemp } from './TableHeader';
import { useOnEnterSwitch } from '../../../readings/accountingNodesReadings/components/Filter';
import { InputSC, SelectSC } from '../../../../shared/ui/Fields';
import { AddressIdSearch } from '../../../addressIdSearch';
import { ButtonTT } from '../../../../tt-components';
import { Space, SpaceLine } from '../../../../shared/ui/Layout/Space/Space';
import { Loader } from '../../../../components';
import { Grid } from '../../../../shared/ui/Layout/Grid';

export const AddNewActForm = () => {
  const { fields, submit } = useForm(createActForm);

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
      createApartmentActFx.done.watch(() =>
        message.success('Акт успешно добавлен')
      ).unsubscribe,
    []
  );

  useEffect(
    () =>
      createApartmentActFx.fail.watch(() =>
        message.error('Ошибка при добавлении акта')
      ).unsubscribe,
    []
  );

  return (
    <>
      <ApartmentActTypesGate />
      <ActResourcesGate />
      <Wrap temp={gridTemp} gap="15px">
        <DocDate>{moment().format('DD.MM.YYYY')}</DocDate>
        <InputSC
          value={fields.registryNumber.value || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => fields.registryNumber.onChange(e.target.value)}
          placeholder="Введите"
          ref={registryNumberRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
        />
        <SelectSC
          value={fields.actType.value as any}
          onChange={fields.actType.onChange as any}
          placeholder="Выберите тип документа"
          ref={documentTypeRef}
          onKeyDown={keyDownEnterGuardedHandler(1)}
        >
          {actTypes?.map((type) => (
            <SelectSC.Option key={type.key} value={type.key!}>
              {type.value}
            </SelectSC.Option>
          ))}
        </SelectSC>
        <SelectSC
          value={fields.actResourceType.value as any}
          onChange={fields.actResourceType.onChange as any}
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
          value={fields.actJobDate.value as any}
          onChange={fields.actJobDate.onChange as any}
          placeholder="Дата"
          id="act-journal-date-picker"
        />
      </Wrap>
      <ButtonWrap>
        <ButtonTT color="white" small onClick={clearCreationActFormValues}>
          Сбросить
        </ButtonTT>
        <Space />
        <ButtonTT
          style={{ padding: '5px 40px' }}
          disabled={pendingRequest}
          color="blue"
          small
          onClick={submit}
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
