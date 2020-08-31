import React from 'react';
import styled from 'styled-components';
import { Icon } from '01/_components/Icon';

export function ApartmentDevicesHistory() {
  const Template = styled.div``;

  const History = styled.div`
    display: grid;
    grid-template-columns: 10fr 2fr;
  `;
  const HistoryWrap = styled.div`
    display: flex;
    align-items: baseline;
    align-items: center;
    height: fit-content;
  `;

  const HistoryButton = styled.button`
    border: 1px solid #dcdee4;
    box-sizing: border-box;
    border-radius: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Text = styled.span`
    padding-left: 4px;
  `;

  return (
    <History>
      <HistoryWrap>
        <Icon icon="list" />
        <Text> История показаний</Text>
      </HistoryWrap>
      <HistoryButton>
        <Icon icon="menu" />
      </HistoryButton>
    </History>
  );
}

export default ApartmentDevicesHistory;
