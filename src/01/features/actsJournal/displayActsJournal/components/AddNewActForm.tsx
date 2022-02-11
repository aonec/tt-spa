import { Loader } from '01/components';
import { AddressIdSearch } from '01/features/addressIdSearch';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { StyledInput, StyledSelector } from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { ButtonTT } from '01/tt-components';
import { message } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React, { useRef } from 'react';
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
        <StyledInput
          value={fields.registryNumber.value || ''}
          onChange={(e) => fields.registryNumber.onChange(e.target.value)}
          placeholder="Введите"
          ref={registryNumberRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
        />
        <StyledSelector
          value={fields.actType.value as any}
          onChange={fields.actType.onChange as any}
          placeholder="Выберите тип документа"
          ref={documentTypeRef}
          onKeyDown={keyDownEnterGuardedHandler(1)}
        >
          {actTypes?.map((type) => (
            <StyledSelector.Option key={type.key} value={type.key!}>
              {type.value}
            </StyledSelector.Option>
          ))}
        </StyledSelector>
        <StyledSelector
          value={fields.actResourceType.value as any}
          onChange={fields.actResourceType.onChange as any}
          placeholder="Выберите"
          ref={recourceRef}
          onKeyDown={keyDownEnterGuardedHandler(2)}
        >
          {actResources?.map((type) => (
            <StyledSelector.Option key={type.key} value={type.key!}>
              {type.value}
            </StyledSelector.Option>
          ))}
        </StyledSelector>
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
