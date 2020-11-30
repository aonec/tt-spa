import React, { useEffect, useState } from 'react';
import styled, { css, use } from 'reshadow/macro';
import { Perpetrator, Contractors, NextStage } from '01/components/Select';
import { Loader } from '01/components';
import { UploadButton, useUpload, UploadList } from '01/components/Upload';

import * as s from '01/r_comp';
import AddDate from '../../../../components/Select/selects/AddDate';
import AddReadings from '../../../../components/Select/selects/AddReadings/AddReadings';
import { addReadings } from '../../hooks/usePanel';
import ChangeDevice from '../ChangeDevice'

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
    flex-direction: column;
   
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


  return styled(styles)(
    // <Route path="/tasks/(\\d+)" exact>
    <panel
      {...use({
        one: AddPerpetrator && EmailNotify,
        two: AddDocuments,
        tree: (Switch && AddPerpetrator) || SetNextStageDeadline,
        four: Completion,
        five: Switch && PushButton,
        six: UploadReadings || addReadingsDone,
        seven: ChangeDevice
      })}
    >
      {(SwitchDevices && !isObserver) && <ChangeDevice device={device}/>}
      {AddPerpetrator && <Perpetrator getData={(data) => dispatch({ type: 'add_data', data })} />}
      {SetNextStageDeadline && <AddDate getData={(data) => dispatch({ type: 'add_data', data })} />}
      {/* Когда в actions приходит setNextStageDeadline (указание даты проверки), то показываем компонент добавления даты */}

      {EmailNotify && <Contractors />}
      {EmailNotify && (
        <Textarea
          value={emailNotify.message ?? ''}
          onChange={(e) => dispatch({
            type: 'email_notify',
            data: { message: e.target.value },
          })}
        />
      )}

      {EmailNotify && <TemplateButton />}
      {(AddDocuments && !isObserver) && (
        <>
          <UploadButton {...upload.button} />
          <UploadList {...upload.list} />
        </>
      )}
      {Switch && (
        <NextStage getData={(data) => dispatch({ type: 'add_data', data })} />
      )}
      {(UploadReadings || addReadingsDone) && (
        <AddReadings apartmentId={apartment.id} addReadings={(readings) => dispatch(addReadings(readings))} readingsBlocked={addReadingsDone || isObserver} />
      )}
      <PushButton {...pushProps} />
    </panel>,
    // </Route>
  );
};


