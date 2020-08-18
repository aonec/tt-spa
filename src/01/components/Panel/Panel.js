import React from "react"
import styled, { css, use } from "reshadow/macro"

import { useSelectFetch } from "01/hooks/useSelectFetch"
import { Select } from "01/components/Select"
import { Upload } from "01/components/Upload"
import { button } from "01/r_comp/button"

export const Panel = React.memo(
  ({
    styles,
    showPanel,
    perpetrator,
    contractors,
    upload,
    pushButton,
    textarea,
    wrapper,
  }) => {
    if (!showPanel) return null
    // console.log(wrapper)
    const { email, document } = wrapper
    return styled(styles, button)(
      <wrapper {...use({ ...wrapper })}>
        {email && perpetrator}
        {email && contractors}
        {email && (
          <>
            <textarea {...textarea} />
            <button data-big data-btn-tmp>
              <span>Выбрать шаблон</span>
            </button>
          </>
        )}
        {document && <Upload {...upload} />}

        <button data-primary data-big data-btn-push {...pushButton}>
          <span>Завершить этап</span>
        </button>
      </wrapper>
    )
  }
)
Panel.defaultProps = {
  styles: css`
    wrapper {
      grid-column: 1 / -1;
      box-shadow: var(--shadow);
      padding: 8px;
      display: grid;
      grid-gap: 16px;

      &[|email] {
        grid-template-columns: repeat(6, minmax(auto, 1fr));
        grid-template-areas:
          "p p p c c c"
          "ta ta ta ta tmp push";
        & > *:nth-child(1) {
          grid-area: p;
        }
        & > *:nth-child(2) {
          grid-area: c;
        }
      }

      &[|document] {
        grid-template-columns: 1fr auto;
        grid-template-areas: "u push";
      }
    }

    Upload {
      grid-area: u;
    }

    textarea {
      grid-area: ta;
    }

    button {
      &[data-btn-tmp] {
        grid-area: tmp;
      }
      &[data-btn-push] {
        grid-area: push;
      }
    }
  `,
}
