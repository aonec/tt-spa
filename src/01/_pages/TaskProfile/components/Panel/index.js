import React, { useEffect, useState } from 'react';
import styled, { css, use } from 'reshadow/macro';
import { Perpetrator, Contractors, NextStage } from '01/components/Select';
import { Loader } from '01/components';
import { UploadButton, useUpload, UploadList } from '01/components/Upload';
import { Form, Upload } from 'antd';

import * as s from '01/r_comp';
import TextArea from 'antd/es/input/TextArea';
import AddDate from '../../../../components/Select/selects/AddDate';
import AddReadings from '../../../../components/Select/selects/AddReadings/AddReadings';
import { addReadings } from '../../hooks/usePanel';
import ChangeDevice from '../ChangeDevice';

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
    &[|five] {
      grid-template-columns: repeat(6, 1fr);
      align-items: end;
      grid-template-areas:
        "ta ta ta ta ta push";
    }
    &[|six] {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 4fr 1fr;
      grid-template-areas:
        "ar ar ar ar"
        ". . . push"
    }
    &[|seven] {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }
    &[|AddPerpetratorAndEmailNotify] {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
    grid-area: ta;
  }

`;

const Textarea = (props) => styled`
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
  `(<textarea rows="0" {...props} />);

const TemplateButton = () => styled(s.button)`
    button {
      grid-area: tmp;
    }
  `(
    <button data-big>
      <span>Выбрать из шаблона</span>
    </button>,
);

const PushButton = ({ loading = false, ...props }) => styled(s.button)`
    button {
      grid-area: push;
      margin-left: 10px;
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

  // const [deadline, setDeadline] = useState();
  // const [addReadingsDone, setAddReadingsDone] = useState(stages.items[2].name === 'Ввод показаний' && Completion);

  const addReadingsDone = stages.items[2]?.name === 'Ввод показаний' && Completion;

  const { emailNotify = {} } = state;

  if (isObserver) {
    return null;
  }
  return styled(styles)(
    <panel
      {...use({
        // one: AddPerpetrator && EmailNotify,
        two: AddDocuments,
        tree: (Switch && AddPerpetrator) || SetNextStageDeadline,
        four: Completion,
        five: Switch && PushButton,
        six: UploadReadings || addReadingsDone,
        AddPerpetratorAndEmailNotify: AddPerpetrator && EmailNotify,
        // seven: SwitchDevices && ChangeDevice,
      })}
    >
      {/* {(SwitchDevices && !isObserver) && <ChangeDevice device={device} state={state} />} */}

      {(AddPerpetrator && EmailNotify) && (
      <>
        <Perpetrator
          getData={(data) => dispatch({ type: 'add_data', data })}
          style={{ width: '48%' }}
        />

        <Contractors
          style={{ width: '48%' }}
          getData={(data) => dispatch({
            type: 'add_email_contractors',
            data,
          })}
        />

        <Form.Item label="Добавьте текст письма" style={{ width: '100%' }}>
          <TextArea
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
        </Form.Item>
        <UploadButton {...upload.button} text="Загрузить письмо из шаблона" />
        <UploadList {...upload.list} />
      </>
      )}

      {(AddPerpetrator && Switch) && (
        <NextStage getData={(data) => dispatch({ type: 'add_data', data })} />
      )}

      {SetNextStageDeadline && <AddDate getData={(data) => dispatch({ type: 'add_data', data })} />}

      {AddDocuments && (
      <>
        <UploadButton {...upload.button} />
        <UploadList {...upload.list} />
      </>
      )}

      {(UploadReadings || addReadingsDone) && (
      <AddReadings apartmentId={apartment.id} addReadings={(readings) => dispatch(addReadings(readings))} readingsBlocked={addReadingsDone || isObserver} />
      )}
      {/* Скрываю кнопку "Завершить этап" только для задачи "Замена прибора" */}
      {/* {!SwitchDevices && <PushButton {...pushProps} />} */}
      {!isObserver && <PushButton {...pushProps} />}

    </panel>,
  );
};
