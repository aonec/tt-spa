import { AddressSearch } from '01/features/addressSearch';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import {
  StyledDatePicker,
  StyledInput,
  StyledSelector,
} from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { ButtonTT } from '01/tt-components';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { $resources, ActResourcesGate } from '../../displayActResources/models';
import { $actTypes, ApartmentActTypesGate } from '../../displayActTypes/models';
import { gridTemp } from './TableHeader';

export const AddNewActForm = () => {
  const {
    keyDownEnterGuardedHandler,
    refs: [
      registryNumberRef,
      documentTypeRef,
      recourceRef,
      addressRef,
      workDateRef,
    ],
  } = useOnEnterSwitch(4);

  const actTypes = useStore($actTypes);
  const actResources = useStore($resources);

  return (
    <>
      <ApartmentActTypesGate />
      <ActResourcesGate />
      <Wrap temp={gridTemp} gap="15px">
        <DocDate>{moment().format('DD.MM.YYYY')}</DocDate>
        <StyledInput
          placeholder="Введите"
          ref={registryNumberRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
        />
        <StyledSelector
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
        {/* <StyledInput
          placeholder="Введите"
          ref={addressRef}
          onKeyDown={keyDownEnterGuardedHandler(3)}
        /> */}
        <AddressSearch />
        <StyledDatePicker
          placeholder="Дата"
          format="DD.MM.YYYY"
          ref={workDateRef}
        />
      </Wrap>
      <ButtonWrap>
        <ButtonTT color="white" small>
          Сбросить
        </ButtonTT>
        <Space />
        <ButtonTT color="blue" small>
          Сохранить
        </ButtonTT>
      </ButtonWrap>
      <SpaceLine />
    </>
  );
};

const Wrap = styled(Grid)`
  padding: 0px 15px 0;
  align-items: center;
`;

const ButtonWrap = styled.div`
  padding: 15px 15px 0;
  display: flex;
  justify-content: flex-end;
`;

export const DocDate = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: bold;
  font-size: 14px;
`;
