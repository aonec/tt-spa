import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { Grid } from '01/shared/ui/Layout/Grid';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { MayBe } from '../actsJournal/displayActsJournal/models';
import { fromEnter } from '../housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { ReactComponent as SearchIcon } from './assets/searchIcon.svg';

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

  useEffect(() => {
    if (firstInputRef) {
      streetRef = firstInputRef;
    }
  }, [firstInputRef]);

  return (
    <SearchWrap temp="10px 1fr 0.35fr 0.3fr" gap="10px">
      <SearchIcon />
      {/* <Popover text="hello world" /> */}
      <StyledInput
        onKeyDown={keyDownEnterGuardedHandler(0)}
        placeholder="Улица"
        ref={firstInputRef}
      />
      <StyledInput
        onKeyDown={keyDownEnterGuardedHandler(1)}
        placeholder="Дом"
        ref={homeNumberRef}
      />
      <StyledInput
        onKeyDown={(e: any) => {
          keyDownEnterGuardedHandler(3)(e);
          fromEnter(() => onExit && onExit())(e);
        }}
        placeholder="Кв."
        ref={apartmentNumberRef}
      />
    </SearchWrap>
  );
};

const Popover: React.FC<{ text: string }> = ({ text }) => {
  return text ? <PopoverWrap>{text}</PopoverWrap> : null;
};

const PopoverWrap = styled.div`
  position: absolute;
  top: 35px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  width: 100%;
  z-index: 10;
`;

const StyledInput = styled.input`
  height: 60%;
  border-right: 1px solid lightgray;

  &:last-child {
    border-right: none;
  }
`;

const SearchWrap = styled(Grid)`
  position: relative;
  color: #333333;
  border: 1px solid lightgray;
  padding: 0px 10px;
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
