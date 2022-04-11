import React, { useState } from 'react';
import styled, { css, use } from 'reshadow/macro';
import { Perpetrator, Contractors, NextStage } from '01/components/Select';
import { Loader } from '01/components';
import { UploadButton, useUpload, UploadList } from '01/components/Upload';
import * as s from '01/r_comp';
import AddDate from '../../../../components/Select/selects/AddDate';
import StyledTextArea from '../../../../tt-components/TextArea';
import { Readings } from '../Readings';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from 'antd';

const styles = css`
  panel {
    display: grid;
    grid-gap: 16px;
    padding: 16px;
    margin-bottom: 16px;
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
      display: block !important;
    }
    &[|styleAddPerpetratorAndSetNextStageDeadline] {
      grid-template-areas: 'p ad push';
      grid-template-columns: 1fr 1fr auto;
      align-items: flex-end;
    }
    &[|styleAddPerpetratorAndAddDocumentsAndAddEmailNotify] {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        'p p c c'
        'ta ta ta ta'
        'ub ub ub ub'
        'ul ul . push';
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
      <Flex>
        <div style={{ marginRight: loading ? 10 : 0 }}>
          <Loader show={loading} />
        </div>
        <span>Завершить этап</span>
      </Flex>
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
  const isPerpetrator = currentUser?.id === taskPerpetrator?.id;

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
        styleAddPerpetratorAndAddDocumentsAndAddEmailNotify:
          AddDocuments && AddPerpetrator && EmailNotify,
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

      {AddDocuments && !EmailNotify && (
        <>
          <UploadButton {...upload.button} />
          <UploadList {...upload.list} />
        </>
      )}

      {SetNextStageDeadline && Completion && (
        <AddDate getData={(data) => dispatch({ type: 'add_data', data })} />
      )}

      {UploadReadings && (
        <Readings getData={(data) => dispatch({ type: 'add_data', data })} />
      )}

      {!isObserver && <PushButton {...pushProps} />}
    </panel>
  );
};
