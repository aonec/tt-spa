import React from "react"
import styled, { css, use } from "reshadow/macro"
import { Route } from "react-router-dom"

import * as s from "01/r_comp"
import { Perpetrator, Contractors, NextStage } from "01/components/Select"
import { Loader } from "01/components"
import { UploadButton, useUpload, UploadList } from "01/components/Upload"

const styles = css`
  panel {
    display: grid;
    grid-gap: 16px;
    padding: 8px;
    box-shadow: var(--shadow);
    &[|one] {
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas:
        "p p p c c c"
        "ta ta ta ta tmp push";
    }
    &[|two] {
      grid-template-areas: "ub ul push";
      grid-template-columns: auto 1fr auto;
    }
    &[|tree] {
      grid-template-areas: "p nst push";
      grid-template-columns: 1fr 1fr auto;
      align-items: end;
    }
    &[|four] {
      grid-template-areas: "push .";
      grid-template-columns: auto 1fr;
    }
  }

  Perpetrator {
    grid-area: p;
  }
  Contractors {
    grid-area: c;
  }
  UploadButton {
    grid-area: ub;
  }
  UploadList {
    grid-area: ul;
  }
  NextStage {
    grid-area: nst;
  }
`

export const Panel = ({
  hiddenPanel = true,
  actions = {},
  state = {},
  pushProps = {},
  isObserver = false,
  perpName = "",
  dispatch = () => {},
}) => {
  const upload = useUpload((data) => dispatch({ type: "add_data", data }))
  if (hiddenPanel) return null

  if (isObserver)
    return styled(styles, s.input)(
      <panel>
        <input_frame data-disabled={true} data-big>
          <input disabled value={perpName} />
        </input_frame>
      </panel>
    )

  const {
    AddPerpetrator,
    EmailNotify,
    AddDocuments,
    Switch,
    Completion,
    SwitchDevices,
    SetNextStageDeadline,
  } = actions
  console.log(actions)
  const { emailNotify = {} } = state

  return styled(styles)(
    // <Route path="/tasks/(\\d+)" exact>
    <panel
      {...use({
        one: AddPerpetrator && EmailNotify,
        two: AddDocuments,
        tree: (Switch && AddPerpetrator) || SetNextStageDeadline,
        four: Completion,
      })}
    >
      {AddPerpetrator && (
        <Perpetrator getData={(data) => dispatch({ type: "add_data", data })} />
      )}
      {EmailNotify && <Contractors />}
      {EmailNotify && (
        <Textarea
          value={emailNotify.message ?? ""}
          onChange={(e) =>
            dispatch({
              type: "email_notify",
              data: { message: e.target.value },
            })
          }
        />
      )}
      {EmailNotify && <TemplateButton />}
      {AddDocuments && (
        <>
          <UploadButton {...upload.button} />
          <UploadList {...upload.list} />
        </>
      )}
      {Switch && (
        <NextStage getData={(data) => dispatch({ type: "add_data", data })} />
      )}
      <PushButton {...pushProps} />
    </panel>
    // </Route>
  )
}

const Textarea = (props) =>
  styled`
    textarea {
      --h: var(--h-big);
      grid-area: ta;
      font: inherit;
      outline: 0;
      color: var(--main-80);
      border: 1px solid var(--frame);
      border-radius: 4px;
      resize: vertical;
      max-height: calc(var(--h) * 3);
      min-height: var(--h);
      padding: 8px 16px;

      &:hover {
        border-color: var(--primary-100);
      }
    }
  `(<textarea rows="0" {...props} />)

const TemplateButton = () =>
  styled(s.button)`
    button {
      grid-area: tmp;
    }
  `(
    <button data-big>
      <span>Выбрать из шаблона</span>
    </button>
  )

const PushButton = ({ loading = false, ...props }) =>
  styled(s.button)`
    button {
      grid-area: push;
    }
  `(
    <button data-big data-primary {...props}>
      <Loader show={loading} />
      <span>Завершить этап</span>
    </button>
  )
