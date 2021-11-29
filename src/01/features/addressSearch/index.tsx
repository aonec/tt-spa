import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useStreetAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { MayBe } from '../actsJournal/displayActsJournal/models';
import { fromEnter } from '../housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { $existingStreets } from '../housingStocks/displayHousingStockStreets/model';
import { ReactComponent as SearchIcon } from './assets/searchIcon.svg';
import { addressSearchForm } from './models';

interface Props {
  apartmentId?: MayBe<number>;
  onChange?(id: number): void;
  firstInputRef?: any;
  onExit?(): void;
}

export const AddressSearch: FC<Props> = (props) => {
  const { onExit, firstInputRef } = props;

  let {
    keyDownEnterGuardedHandler,
    refs: [streetRef, homeNumberRef, apartmentNumberRef],
  } = useOnEnterSwitch(3);

  const { fields } = useForm(addressSearchForm);

  useEffect(() => {
    if (firstInputRef) {
      streetRef = firstInputRef;
    }
  }, [firstInputRef]);

  function onChangeHandler(e: any) {
    (fields as any)[e.target.name]?.onChange(e.target.value);
  }

  const existingStreets = useStore($existingStreets);

  const { streetMatch, options } = useStreetAutocomplete(
    fields.street.value,
    existingStreets
  );

  return (
    <SearchWrap temp="12px 1fr 0.35fr 0.3fr">
      <SearchIcon />

      <PopoverWrap>
        <StyledInput
          autoComplete="off"
          name="street"
          onChange={onChangeHandler}
          value={fields.street.value}
          style={{
            borderLeft: 'none',
          }}
          onKeyDown={(e) => {
            fromEnter(() => fields.street.onChange(streetMatch))(e);
            keyDownEnterGuardedHandler(0)(e);
          }}
          placeholder="Улица"
          ref={firstInputRef}
        />
        <Popover>{options[0]?.value}</Popover>
      </PopoverWrap>

      <PopoverWrap>
        <StyledInput
          autoComplete="off"
          name="house"
          onChange={onChangeHandler}
          value={fields.house.value}
          onKeyDown={keyDownEnterGuardedHandler(1)}
          placeholder="Дом"
          ref={homeNumberRef}
        />
        <Popover></Popover>
      </PopoverWrap>

      <PopoverWrap>
        <StyledInput
          autoComplete="off"
          name="apartment"
          onChange={onChangeHandler}
          value={fields.apartment.value}
          onKeyDown={(e: any) => {
            keyDownEnterGuardedHandler(3)(e);
            fromEnter(() => onExit && onExit())(e);
          }}
          placeholder="Кв."
          ref={apartmentNumberRef}
        />
        <Popover></Popover>
      </PopoverWrap>
    </SearchWrap>
  );
};

const PopoverWrap = styled.div`
  position: relative;
`;

const Popover: React.FC = ({ children }) => {
  const Wrap = styled.div`
    position: absolute;
    top: 30px;
    background-color: #188fff;
    color: white;
    backdrop-filter: blur(4px);
    border-radius: 4px;
    padding: 2px 8px;
    width: 100%;
    z-index: 10;
  `;

  return children ? <Wrap>{children}</Wrap> : null;
};

const StyledInput = styled.input`
  height: 60%;
  border-left: 1px solid lightgray;
  padding: 0 7px;

  &:nth-child(2) {
    border-right: none;
  }
`;

const SearchWrap = styled(Grid)`
  position: relative;
  color: #333333;
  border: 1px solid lightgray;
  padding: 0px 5px 0 10px;
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

  &:focus {
    box-shadow: 0 4px 8px #188fff52;
  }
`;
