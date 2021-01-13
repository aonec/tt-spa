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
    &[|styleAddPerpetratorAndEmailNotify] {
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas:
        "p p p c c c"
        "ta ta ta ta ta ta"
        "ub ub ul ul ul push";
    }
    &[|styleSwitchAndAddPerpetrator] {
      grid-template-areas: "p ns push";
      grid-template-columns: 1fr 1fr auto;
    }
    &[|styleAddDocuments] {
      grid-template-areas: "ub ul push";
      grid-template-columns: auto 1fr auto;
    }
    &[|styleCompletion] {
      grid-template-columns: 1fr;
    }
    &[|styleSwitchAndAddDocuments] {
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas:
        "ns ns ns ns ns ns"
        "ub ul ul ul ul push";
    }
    &[|styleReadings] {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        "ar ar ar ar"
        ". . . push"
    }
    &[|styleAddPerpetratorAndSetNextStageDeadline] {
      grid-template-areas: "p ad push";
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

const PushButton = ({ loading = false, ...props }) => styled(s.button)`
    button {
      margin-left: auto;
      width: fit-content;
    }
  `(
    <button data-big data-primary {...props}>
      <Loader show={loading} />
      <span>Завершить этап</span>
    </button>,
);

export const Panel = ({
  expectedCompletionTime,
  hiddenPanel = true,
  actions = {},
  state = {},
  pushProps = {},
  isObserver = false,
  perpName = '',
  apartment,
  device,
  dispatch = () => {
  },
  stages = {},
}, ...props) => {
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
  const addReadingsDone = stages.items[2]?.name === 'Ввод показаний' && Completion;

  // const [deadline, setDeadline] = useState();
  // const [addReadingsDone, setAddReadingsDone] = useState(stages.items[2].name === 'Ввод показаний' && Completion);

  if (isObserver && AddDocuments && Switch) {
    return styled(styles, s.input)(
      <panel style={{ display: 'flex' }}>
        <input_frame data-disabled data-big style={{ width: '50%' }}>
          <input disabled value={perpName} />
        </input_frame>
        <input_frame data-disabled data-big style={{ width: '50%' }}>
          <input disabled value={deadline} />
        </input_frame>
      </panel>,
    );
  }

  // AddPerpetrator SetNextStageDeadline

  if (isObserver) {
    return null;
  }
  return styled(styles)(
    <panel
      {...use({
        styleSwitchAndAddPerpetrator: Switch && AddPerpetrator,
        styleCompletion: Completion,
        styleSwitchAndAddDocuments: Switch && AddDocuments,
        styleReadings: UploadReadings || addReadingsDone,
        styleAddPerpetratorAndEmailNotify: AddPerpetrator && EmailNotify,
        styleAddDocuments: AddDocuments,
        styleAddPerpetratorAndSetNextStageDeadline: AddPerpetrator && SetNextStageDeadline,
        // seven: SwitchDevices && ChangeDevice,
      })}
    >
      {/* {(SwitchDevices && !isObserver) && <ChangeDevice device={device} state={state} />} */}

      {(AddPerpetrator && EmailNotify) && (
      <>
        <Perpetrator
          getData={(data) => dispatch({ type: 'add_data', data })}
        />

        <Contractors
          getData={(data) => dispatch({ type: 'add_email_contractors', data })}
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

      {(AddPerpetrator && Switch) && (
        <>
          <Perpetrator
            getData={(data) => dispatch({ type: 'add_data', data })}
          />
          <NextStage getData={(data) => dispatch({ type: 'add_data', data })} />
        </>
      )}

      {(AddDocuments && Switch) && (
        <>
          <NextStage getData={(data) => dispatch({ type: 'add_data', data })} />
          <UploadButton {...upload.button} />
          <UploadList {...upload.list} />
        </>
      )}

      {(AddDocuments && !Switch) && (
      <>
        <UploadButton {...upload.button} />
        <UploadList {...upload.list} />
      </>
      )}
      {(AddPerpetrator && SetNextStageDeadline) && (
        <>
          <Perpetrator
            getData={(data) => dispatch({ type: 'add_data', data })}
          />
          <AddDate getData={(data) => dispatch({ type: 'add_data', data })} />
        </>
      )}

      {(SetNextStageDeadline && Completion) && <AddDate getData={(data) => dispatch({ type: 'add_data', data })} />}

      {(UploadReadings || addReadingsDone) && (
      <AddReadings apartmentId={apartment.id} addReadings={(readings) => dispatch(addReadings(readings))} readingsBlocked={addReadingsDone || isObserver} />
      )}
      {/* Скрываю кнопку "Завершить этап" только для задачи "Замена прибора" */}
      {/* {!SwitchDevices && <PushButton {...pushProps} />} */}
      {!isObserver && <PushButton {...pushProps} />}

    </panel>,
  );
};
