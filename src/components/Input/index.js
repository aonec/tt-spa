import React, { useState, forwardRef } from "react"
import styled, { css, use } from "reshadow/macro"
import t from "prop-types"

import { Icon } from "components"

export const Input = forwardRef(
  (
    {
      styles,
      search = false,
      big = false,
      disabled = false,
      password = false,
      error = false,
      valid = false,
      loading = false,
      wrapper = {},
      ...props
    },
    ref
  ) => {
    const [hiddenPass, setHiddenPass] = useState(password)
    return styled(styles)(
      <wrapper {...wrapper} {...use({ big, disabled, error, valid })}>
        {search && <search as="Icon" icon="search" />}
        <input
          ref={ref}
          readOnly={loading}
          type={hiddenPass ? "password" : "text"}
          disabled={disabled}
          {...props}
        />
        {error && <alarm as="Icon" icon="alarm" />}
        {password && (
          <button
            tabIndex="-1"
            type="button"
            disabled={disabled}
            onClick={() => setHiddenPass(!hiddenPass)}
          >
            <Icon icon={hiddenPass ? "on" : "off"} />
          </button>
        )}
      </wrapper>
    )
  }
)

Input.propTypes = {
  search: t.bool,
  big: t.bool,
  placeholder: t.string,
  password: t.bool,
  disabled: t.bool,
  error: t.bool,
  valid: t.bool,
  loading: t.bool,
}

Input.defaultProps = {
  styles: css`
    wrapper {
      --active: var(--primary);
      cursor: text;
      border: 1px solid;
      border-color: rgb(var(--frame));
      color: rgba(var(--main), 0.8);
      background-color: #fff;
      display: grid;
      grid-gap: 8px;
      grid-auto-flow: column;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      place-self: center stretch;
      padding: 0 8px;
      height: 32px;
      border-radius: 4px;
      font-size: 14px;

      transition-property: border-color, box-shadow;
      transition-duration: 200ms;
      transition-timing-function: ease;

      &:not([|disabled]):hover,
      &:focus-within {
        border-color: rgb(var(--active));
      }

      &:focus-within {
        box-shadow: 0px 4px 8px rgba(var(--active), 0.16),
          0px 1px 2px rgba(var(--active), 0.08);
      }

      &[|big] {
        height: 48px;
        font-size: 16px;
        padding: 0 1em;
      }

      &[|disabled] {
        background-color: rgba(var(--main), 0.04);
        cursor: not-allowed;
      }

      &:not([|disabled])[|valid] {
        --active: var(--success);
        border-color: rgb(var(--success));
      }

      &:not([|disabled])[|error] {
        --active: var(--error);
        border-color: rgb(var(--error));
      }
    }

    search {
      grid-column: 1;
    }

    input:not(:disabled) {
      grid-column: 2;
      box-shadow: inset 0 0 0 50px #fff;
      -webkit-text-fill-color: rgba(var(--main), 0.8);
    }

    alarm {
      grid-column: 3;
      fill: rgb(var(--error));
    }

    button {
      display: grid;
      grid-column: -1;
      color: rgba(var(--main), 0.8);

      &:not(:disabled):hover,
      &:focus {
        color: rgb(var(--primary));
      }

      &:disabled {
        cursor: inherit;
      }
    }
  `,
}
