/* eslint-disable */

import styled, { css } from 'styled-components';
import { ButtonTT } from '../../../../tt-components/ButtonTT';

export const StageItem = styled.div.attrs((props) => ({
  status: props.status,
}))`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-row-gap: 8px;
  grid-column-gap: 16px;
  padding-bottom: 20px;
  position: relative;
  color: var(--main-80);
  border-color: var(--bg);
  & StageName {
    opacity: 0.6;
  }

  ${(props) =>
    props.status === 'InProgress' &&
    css`
      border-color: var(--primary-100);
      & span {
        background: var(--primary-100);
        color: #fff;
      }
    `}

  ${(props) =>
    props.status === 'Done' &&
    props.expired === false &&
    css`
      border-color: var(--primary-100);
      background: #fff;
      & span {
        border-color: var(--primary-100);
        color: var(--primary-100);
      }
    `}
  
  ${(props) =>
    props.status === 'Done' &&
    props.expired === true &&
    css`
      & span {
        border-color: var(--error);
        color: var(--error);
      }
    `}
  
  ${(props) =>
    props.status === 'Waiting' &&
    css`
      & span {
        border-color: white;
        color: rgba(39, 47, 90, 0.8);
        background: var(--bg);
      }
    `}
  
  &:not(:last-child)::before {
    content: '';
    position: absolute;
    border: 1px solid;
    border-color: var(--primary-100);
    bottom: 2px;
    top: 34px;
    left: 16px;
  }
`;
export const Circle = styled.span`
  grid-row: 1 / var(--span);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid;
  border-color: var(--primary-100);
  display: inline-grid;
  place-items: center;
  color: var(--status-color);
`;

export const StageName = styled.div`
  grid-column: 2 / -1;
  opacity: 0.8;
  align-self: center;
`;

export const Time = styled.div`
  font-size: 12px;
  opacity: 0.32;
  grid-row-gap: 8px;
`;

export const UserName = styled.div`
  font-size: 12px;
  opacity: 0.32;
  grid-gap: 8px;
`;

export const Button = styled(ButtonTT)`
  height: 32px;
  font-size: 14px;
  line-height: 16px;
  padding: 4px 12px;
  grid-column: 2 / -1;
  justify-self: start;
`;
