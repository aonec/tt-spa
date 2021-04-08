import React, { useState } from 'react';
import styled, { css, use } from 'reshadow/macro';
import { Perpetrator, Contractors, NextStage } from '01/components/Select';
import { Loader } from '01/components';
import { UploadButton, useUpload, UploadList } from '01/components/Upload';
import * as s from '01/r_comp';
import AddDate from '../../../../components/Select/selects/AddDate';
import AddReadings from '../../../../components/Select/selects/AddReadings/AddReadings';
import { addReadings } from '../../hooks/usePanel';
import { StyledTextArea } from '../../../../tt-components';
import ChangeDevice from '../ChangeDevice';

const styles = css`
  panel {
    display: grid;
    grid-gap: 16px;
    padding: 8px;
    box-shadow: var(--shadow);
    &[|styleSwitch] {
      grid-template-columns: 1fr auto;
      grid-template-areas: 'ns push';
    }
    &[|styleAddPerpetratorAndEmailNotify] {
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas:
        'p p p c c c'
        'ta ta ta ta ta ta'
        'ub ub ul ul push push';
    }
    &[|styleSwitchAndAddPerpetrator] {
      grid-template-areas: 'p ns push';
      grid-template-columns: 1fr 1fr auto;
    }
    &[|styleAddDocuments] {
      grid-template-areas: 'ub ul push';
      grid-template-columns: auto 1fr auto;
    }
    &[|styleCompletion] {
      grid-template-columns: 1fr;
    }
    &[|styleSwitchAndAddDocuments] {
      grid-template-columns: repeat(5, 1fr);
      grid-template-areas:
        'ns ns ns ns ns'
        'ub ul ul ul push';
    }
    &[|styleReadings] {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        'ar ar ar ar'
        '. . . push';
    }
    &[|styleAddPerpetratorAndSetNextStageDeadline] {
      grid-template-areas: 'p ad push';
      grid-template-columns: 1fr 1fr auto;
      align-items: flex-end;
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
    grid-area: ns;
  }
  StyledTextArea {
    grid-area: ta;
  }
  PushButton {
    grid-area: push;
  }
  AddDate {
    grid-area: ad;
  }
`;

const PushButton = ({ loading = false, ...props }) =>
  styled(s.button)`
    button {
      align-self: end;
      margin-left: auto;
      width: fit-content;
    }
  `(
    <button data-big data-primary {...props}>
      <Loader show={loading} />
      <span>Завершить этап</span>
    </button>
  );

export const Panel = (
  {
    expectedCompletionTime,
    hiddenPanel = true,
    actions = {},
    state = {},
    pushProps = {},
    isObserver = false,
    perpName = '',
    apartment,
    device,
    dispatch = () => {},
    stages = {},
  },
  ...props
) => {
  const upload = useUpload((data) => dispatch({ type: 'add_data', data }));
  const [message, setMessage] = useState();
  if (hiddenPanel) return null;
  const {
    AddPerpetrator,
    EmailNotify,
    AddDocuments,
    Switch,
    Completion,
    SwitchDevices,
    SetNextStageDeadline,
    UploadReadings,
  } = actions;

  const deadline = new Date(expectedCompletionTime).toLocaleDateString();
  const addReadingsDone =
    stages.items[2]?.name === 'Ввод показаний' && Completion;

  const taskPerpetrator = state.perpetrator;
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isPerpetrator = currentUser.id === taskPerpetrator?.id;

  if (isObserver && AddDocuments && Switch) {
    return styled(
      styles,
      s.input
    )(
      <panel style={{ display: 'flex' }}>
        <input_frame data-disabled data-big style={{ width: '50%' }}>
          <input disabled value={perpName} />
        </input_frame>
        <input_frame data-disabled data-big style={{ width: '50%' }}>
          <input disabled value={deadline} />
        </input_frame>
      </panel>
    );
  }

  if (!isPerpetrator) {
    return null;
  }
  return styled(styles)(
    <panel
      {...use({
        styleSwitch: Switch,
        styleSwitchAndAddPerpetrator: Switch && AddPerpetrator,
        styleCompletion: Completion,
        styleSwitchAndAddDocuments: Switch && AddDocuments,
        styleReadings: UploadReadings || addReadingsDone,
        styleAddPerpetratorAndEmailNotify: AddPerpetrator && EmailNotify,
        styleAddDocuments: AddDocuments,
        styleAddPerpetratorAndSetNextStageDeadline:
          AddPerpetrator && SetNextStageDeadline,
      })}
    >
      {AddPerpetrator && (
        <Perpetrator getData={(data) => dispatch({ type: 'add_data', data })} />
      )}

      {Switch && (
        <NextStage getData={(data) => dispatch({ type: 'add_data', data })} />
      )}

      {SetNextStageDeadline && (
        <AddDate getData={(data) => dispatch({ type: 'add_data', data })} />
      )}

      {EmailNotify && (
        <>
          <Contractors
            getData={(data) =>
              dispatch({ type: 'add_email_contractors', data })
            }
          />
          <StyledTextArea
            labelText="Отправка пригласительного письма"
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              dispatch({
                type: 'add_email_message',
                data: { message: e.target.value },
              });
            }}
          />
          <UploadButton {...upload.button} text="Загрузить письмо из шаблона" />
          <UploadList {...upload.list} />
        </>
      )}

      {AddDocuments && (
        <>
          <UploadButton {...upload.button} />
          <UploadList {...upload.list} />
        </>
      )}

      {SetNextStageDeadline && Completion && (
        <AddDate getData={(data) => dispatch({ type: 'add_data', data })} />
      )}

      {(UploadReadings || addReadingsDone) && (
        <AddReadings
          apartmentId={apartment.id}
          addReadings={(readings) => dispatch(addReadings(readings))}
          readingsBlocked={addReadingsDone || isObserver}
        />
      )}
      {!isObserver && <PushButton {...pushProps} />}
    </panel>
  );
};
