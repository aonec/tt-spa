import { css } from "reshadow/macro"

export const input = css`
  input_frame {
    --active: var(--primary-100);
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 8px;
    border: 1px solid var(--frame);
    border-radius: 4px;
    position: relative;
    height: var(--h-norm);
    background: #fff;
    z-index: 10;
    color: var(--main-80);
    overflow: hidden;
    padding: 0 8px;
    cursor: text;
    &:hover:not([data-disabled]),
    &:focus-within:not([data-disabled]) {
      border-color: var(--active);
    }
    &:focus-within:not([data-disabled]) {
      box-shadow: 0px 0px 8px var(--active), 0px 2px 2px var(--active);
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      z-index: 0;
    }
    &[data-big] {
      font-size: 16px;
      padding: 0 1em;
      height: var(--h-big);
    }
    &[data-disabled] {
      cursor: not-allowed;
      & input {
        box-shadow: none;
      }
      &::before {
        background: var(--main-4);
      }
    }
    &[|invalid] {
      --active: var(--error);
      border-color: var(--error);
      color: var(--error);
    }
    &[|valid] {
      --active: var(--success);
      border-color: var(--success);
    }
  }
  input_frame > input {
    grid-column: 2;
    position: relative;
    z-index: 1;
    align-self: stretch;
    box-shadow: inset 0 0 0 50px #fff;
    -webkit-text-fill-color: var(--main-80);
    &::placeholder {
      -webkit-text-fill-color: var(--main-32);
    }
  }
  input_frame > Icon,
  input_frame > pass_btn {
    align-self: center;
    position: relative;
    z-index: 1;
  }
  pass_btn {
    display: inherit;
    grid-column: -1;
    cursor: pointer;
    &:hover {
      color: var(--primary-100);
    }
  }
`
