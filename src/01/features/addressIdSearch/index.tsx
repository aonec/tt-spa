import { Loader } from '01/components';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { combine } from 'effector';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React, { FC, useState } from 'react';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { MayBe } from '../actsJournal/displayActsJournal/models';
import { fromEnter } from '../housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  fetchExistingStreets,
} from '../housingStocks/displayHousingStockStreets/model';
import { ReactComponent as SearchIcon } from './assets/searchIcon.svg';
import {
  addressSearchForm,
  $apartmentSearchId,
  onExitAddressSearchForm,
  fetchApartmentSearchIdFx,
  $error,
} from './models';

interface Props {
  apartmentId?: MayBe<number>;
  onChange?(id: number): void;
  firstInputRef?: any;
  onExit?(): void;
}

export const AddressIdSearch: FC<Props> = (props) => {
  const { onExit, firstInputRef } = props;
  const error = useStore($error);

  const [counter, setCounter] = useState(0);

  const fetchedApartmentId = useStore($apartmentSearchId);

  const { fields, submit } = useForm(addressSearchForm);
  const fieldsArray = [fields.street, fields.house, fields.apartment];

  const existingStreets = useStore($existingStreets);

  let { keyDownEnterGuardedHandler, refs } = useOnEnterSwitch(3);

  const [_, homeNumberRef, apartmentNumberRef] = refs;

  function onChangeHandler(e: any) {
    (fields as any)[e.target.name]?.onChange(e.target.value);
  }

  function clearValuesOnFocus(index: number) {
    const subFieldsArray = fieldsArray.slice(index, fieldsArray.length);

    subFieldsArray.forEach((field) => field.onChange(''));
  }

  const clearValuesOnFocusCallback = (index: number) => () =>
    clearValuesOnFocus(index);

  const { match: streetMatch, bestMatch: bestStreetMatch } = useAutocomplete(
    fields.street.value,
    existingStreets
  );

  const loading = useStore(
    combine(
      fetchExistingStreets.pending,
      fetchApartmentSearchIdFx.pending,
      (...pendings) => pendings.some(Boolean)
    )
  );

  const isActive = (ref: any) => ref.current === document.activeElement;

  const Popover: React.FC<{ name: string; children: string }> = ({
    children,
    name,
  }) => {
    const Wrap = styled.div`
      position: absolute;
      top: 35px;
      background-color: #188fff;
      color: white;
      backdrop-filter: blur(4px);
      border-radius: 4px;
      padding: 2px 8px;
      width: 100%;
      z-index: 10;
      cursor: pointer;
    `;

    return children ? (
      <Wrap onClick={() => (fields as any)[name]?.onChange(children)}>
        {children}
      </Wrap>
    ) : null;
  };

  const isSuccess = typeof fetchedApartmentId === 'number';

  return (
    <SearchWrap
      temp="12px 0.8fr 0.35fr 0.3fr"
      focused={[firstInputRef, ...refs].some(
        (elem) => elem.current === document.activeElement
      )}
      isSuccess={isSuccess}
      error={error}
    >
      {error ? (
        <XLg style={{ color: '#c31700' }} />
      ) : isSuccess ? (
        <CheckLg style={{ color: '#00c34e' }} />
      ) : loading ? (
        <Loader show size={14} />
      ) : (
        <SearchIcon />
      )}
      <PopoverWrap>
        <StyledInput
          autoComplete="off"
          name="street"
          onChange={onChangeHandler}
          value={fields.street.value}
          style={{
            borderLeft: 'none',
          }}
          onFocus={clearValuesOnFocusCallback(0)}
          onKeyDown={(e) => {
            keyDownEnterGuardedHandler(0)(e);
            fromEnter(() => fields.street.onChange(bestStreetMatch))(e);
          }}
          placeholder="Улица"
          ref={firstInputRef}
        />
        {isActive(firstInputRef) && (
          <Popover name="street">{bestStreetMatch}</Popover>
        )}
      </PopoverWrap>

      <PopoverWrap>
        <StyledInput
          autoComplete="off"
          name="house"
          onFocus={clearValuesOnFocusCallback(1)}
          onChange={onChangeHandler}
          value={fields.house.value}
          disabled={!fields.street.value}
          onKeyDown={keyDownEnterGuardedHandler(1)}
          placeholder="Дом"
          ref={homeNumberRef}
        />
      </PopoverWrap>

      <PopoverWrap>
        <StyledInput
          style={{ borderRadius: '0 3px 3px 0' }}
          autoComplete="off"
          name="apartment"
          onChange={onChangeHandler}
          disabled={!fields.house.value}
          value={fields.apartment.value}
          onFocus={clearValuesOnFocusCallback(2)}
          onKeyDown={(e: any) => {
            keyDownEnterGuardedHandler(3)(e);
            fromEnter(() => {
              onExit && onExit();
              onExitAddressSearchForm();
            })(e);
            setCounter((prev) => prev + 1);
          }}
          placeholder="Кв."
          ref={apartmentNumberRef}
        />
      </PopoverWrap>
    </SearchWrap>
  );
};

const PopoverWrap = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  height: 30px;
  border-left: 1px solid lightgray;
  padding: 0 7px;

  &:disabled {
    background: #ebebf0c0;
  }
`;

const SearchWrap = styled(Grid)<{
  isSuccess?: boolean;
  focused?: boolean;
  error?: boolean;
}>`
  position: relative;
  color: #333333;
  border: 1px solid lightgray;
  padding-left: 10px;
  transition: 0.2s;
  align-items: center;

  &:last-child {
    margin-right: 10px;
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  ${({ focused }) => focused && `border: 1px solid #1890ff;`}

  ${({ isSuccess }) =>
    isSuccess && `border: 1px solid #00c34e; box-shadow: 0 4px 8px #1dbf7438;`}

${({ error }) =>
    error && `border: 1px solid #c31700; box-shadow: 0 4px 8px #bf1d1d38;`}

  &:focus {
    box-shadow: 0 4px 8px #188fff52;
  }
`;
