import { css } from "reshadow/macro"

export const item = css`
  item,
  device {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    padding: 8px;
    grid-gap: 8px;
    cursor: pointer;

    &:hover {
      color: var(--primary-100);
    }
    & * {
      display: inline-flex;
      align-items: center;
    }
  }
  item_square {
    display: inline-flex;
    & sup {
      font-size: 8px;
      transform: translateY(-2px);
    }
  }

  device_status,
  item_owner {
    opacity: 0.8;
  }

  devcie_date,
  device_number,
  item_square,
  item_number {
    opacity: 0.6;
  }

  device_number {
    font-weight: 400;
  }

  device_status {
    &::before {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      margin-right: 8px;
      background: var(--success);
    }
  }
`
