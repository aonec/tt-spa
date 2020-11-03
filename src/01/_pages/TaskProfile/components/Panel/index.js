import React, { useEffect } from 'react';
import styled, { css, use } from 'reshadow/macro';
import { Route } from 'react-router-dom';
import { Perpetrator, Contractors, NextStage } from '01/components/Select';
import { Loader } from '01/components';
import { UploadButton, useUpload, UploadList } from '01/components/Upload';
import moment from 'moment';

import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import * as s from '01/r_comp';
import AddDate from '../../../../components/Select/selects/AddDate';
import AddReadings from '../../../../components/Select/selects/AddReadings/AddReadings';
import {
  setModalChangeODPUVisible, setModalDeregisterVisible,
} from '../../../../Redux/actions/actions';
import ButtonTT from '../../../../tt-components/ButtonTT';

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
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "";
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
  AddReadings {
    grid-area: ar;
  }
`;

export const Panel = ({
                        expectedCompletionTime,
                        hiddenPanel = true,
                        actions = {},
                        state = {},
                        pushProps = {},
                        isObserver = false,
                        perpName = '',
                        apartment,
                        dispatch = () => {
                        },
                      }, ...props) => {
  const upload = useUpload((data) => dispatch({ type: 'add_data', data }));

  const dispatchRedux = useDispatch();

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
  const showModalChangeOdpu = () => {
    console.log("showModalChangeOdpu")
    dispatchRedux(setModalChangeODPUVisible(true));
  }
  const showModalDeregister = () => {
    console.log("showModalDeregister")
    dispatchRedux(setModalDeregisterVisible(true));
  }

  if (isObserver && AddDocuments && Switch) {
    return styled(styles, s.input)(
      <panel style={{ display: 'flex' }}>

        <input_frame data-disabled data-big style={{ width: '50%' }}>
          <input disabled value={perpName}/>
        </input_frame>
        <input_frame data-disabled data-big style={{ width: '50%' }}>
          <input disabled value={deadline}/>
        </input_frame>
      </panel>,
    );
  }

  // const [deadline, setDeadline] = useState();

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
      })}
    >
      {AddPerpetrator && <Perpetrator getData={(data) => dispatch({ type: 'add_data', data })}/>}
      {SetNextStageDeadline && <AddDate getData={(data) => dispatch({ type: 'add_data', data })}/>}
      {/* Когда в actions приходит setNextStageDeadline (указание даты проверки), то показываем компонент добавления даты */}

      {EmailNotify && <Contractors/>}
      {EmailNotify && (
        <Textarea
          value={emailNotify.message ?? ''}
          onChange={(e) => dispatch({
            type: 'email_notify',
            data: { message: e.target.value },
          })}
        />
      )}


      {/*{SwitchDevices && <ButtonTT color={"blue"} style={{ width: 'fit-content' }} onClick={showModalChangeOdpu}>Заменить*/}
      {/*  расходомер</ButtonTT>}*/}

      {/*{Switch && <ButtonTT color={"red"} style={{ width: 'fit-content' }} onClick={showModalDeregister}>Снять прибор с*/}
      {/*  учета</ButtonTT>}*/}

      {EmailNotify && <TemplateButton/>}
      {AddDocuments && (
        <>
          <UploadButton {...upload.button} />
          <UploadList {...upload.list} />
        </>
      )}
      {Switch && (
        <NextStage getData={(data) => dispatch({ type: 'add_data', data })}/>
      )}
        {UploadReadings && (
            <>
            <AddReadings apartmentId={apartment.id}/>
            </>
        )
        }
      <PushButton {...pushProps} />
    </panel>,
    // </Route>
  );
};

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
    <Loader show={loading}/>
    <span>Завершить этап</span>
  </button>,
);
