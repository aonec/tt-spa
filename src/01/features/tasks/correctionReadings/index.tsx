import { Form, message } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { NextStagesGate } from '../displayNextStages/models';
import { $task, fetchTaskFx } from '../displayTask/models';
import { pushStageFx } from '../pushingStage/models';
import {
  Header,
  InfoBlock,
  ReadingInputStyled,
  Wrap,
} from './CorrectionReadings.styled';
import {
  correctionReadingsForm,
  CorrectionReadingsGate,
  completeStage,
} from './models';
import { getArrayByCountRange } from '../../../_pages/MetersPage/components/utils';
import { Loader } from '../../../components';
import { DateLine } from '../../../_components/DateLine/DateLine';
import { DeviceDataString } from '../../individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '../../../shared/ui/Layout/Flex';
import { Grid } from '../../../shared/ui/Layout/Grid';
import { IndividualDeviceReadingsItemHistoryResponse } from '../../../../api/types';
import { getReadingValuesArray } from '../../readings/displayReadingHistory/utils';
import { getIndividualDeviceRateNumByName } from '../../../_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { ReadingsHistoryButton } from '../../../../ui-kit/shared_components/reading_history_button';
import IsActive from '../../../tt-components/IsActive';
import { translateMountPlace } from '../../../utils/translateMountPlace';
import { ButtonTT } from '../../../tt-components';
import { Space, SpaceLine } from '../../../shared/ui/Layout/Space/Space';
import { PendingLoader } from '../../../shared/ui/PendingLoader';

export const CorrectionReadingsPanel = () => {
  const task = useStore($task);

  const pending = useStore(fetchTaskFx.pending);

  const { fields } = useForm(correctionReadingsForm);

  const pendingCompleteStage = useStore(pushStageFx.pending);

  useEffect(
    () =>
      pushStageFx.failData.watch((error) => {
        const errorMessage = ({ ...error } as any)?.response?.data?.error
          ?.Message;

        if (errorMessage) message.error(errorMessage);
      }).unsubscribe,
    []
  );

  useEffect(
    () =>
      pushStageFx.done.watch(() => {
        message.success('Задача успешно обновлена');
      }).unsubscribe,
    []
  );

  if (!task?.individualDevices) return null;

  const device = task?.individualDevices[0];
  const problemReading = device?.invalidReading;
  const fixedReading = device?.fixedReading;

  if (!device) return null;

  const deviceDataString = (
    <Flex style={{ justifyContent: 'space-between' }}>
      <Flex>
        <DeviceDataString device={device} />
        <Space w={5} />
        <IsActive closingDate={device?.closingDate} />
        <Space />
        <div>{translateMountPlace(device?.mountPlace)}</div>
        <Space />
        <DateLine
          lastCheckingDate={device?.lastCheckingDate}
          futureCheckingDate={device?.futureCheckingDate}
        />
      </Flex>
      <ReadingsHistoryButton deviceId={device?.id} />
    </Flex>
  );

  const readingDate = moment(problemReading?.readingDate).format('MMMM YYYY');
  const rateNum = getIndividualDeviceRateNumByName(device?.rateType) || 0;

  const problemReadingValues =
    problemReading &&
    getReadingValuesArray(
      problemReading as IndividualDeviceReadingsItemHistoryResponse,
      'value',
      rateNum
    );

  const editTaskInfo = (
    <Grid temp="0.7fr 0.5fr 0.8fr 1.2fr" gap="15px">
      <InfoBlock title="Некорректные показания" color="red">
        {problemReadingValues?.map((value, index) => (
          <div>
            <span style={{ color: 'gray', fontWeight: 300 }}>
              T{index + 1}:
            </span>{' '}
            {value}
          </div>
        ))}
      </InfoBlock>
      <InfoBlock title="Период">{readingDate}</InfoBlock>
      <InfoBlock title="Оператор">{problemReading?.user?.name!}</InfoBlock>
      <InfoBlock title="Причина ошибки">{task?.creationReason!}</InfoBlock>
    </Grid>
  );

  const readingValues = getArrayByCountRange(
    rateNum,
    (count) => (fields.readingValue.value as any)[`value${count}`]
  );

  const isReadOnly = !task?.isPerpetrator;

  const inputReadings = device && (
    <Form.Item label="Исправленные показания">
      <Grid temp="1fr" gap="10px">
        {[...readingValues].map((elem, index) => {
          const placeholderText = `T${index + 1}: ${
            fixedReading ? (fixedReading as any)[`value${index + 1}`] : ''
          }`;

          return (
            <ReadingInputStyled
              disabled={isReadOnly}
              placeholder={placeholderText}
              resource={device.resource}
              type="number"
              value={elem}
              onChange={(e: any) =>
                fields.readingValue.onChange({
                  ...fields.readingValue.value,
                  [`value${index + 1}`]:
                    e.target.value === '' ? '' : Number(e.target.value),
                })
              }
            />
          );
        })}
      </Grid>
    </Form.Item>
  );

  const extraCheckingSelection = (
    <div>
      <SpaceLine />
      <Checkbox
        disabled={isReadOnly}
        checked={fields.needSeniorOperatorCheck.value}
        onClick={() =>
          fields.needSeniorOperatorCheck.onChange(
            !fields.needSeniorOperatorCheck.value
          )
        }
      >
        Требуется дополнительная проверка старшего оператора
      </Checkbox>
      <Space />
      <Form.Item label="Комментарий">
        <TextArea
          placeholder="Введите комментарий"
          disabled={!fields.needSeniorOperatorCheck.value || isReadOnly}
          value={fields.comment.value}
          onChange={(e) => fields.comment.onChange(e.target.value)}
        />
      </Form.Item>
    </div>
  );

  const endStageButton = isReadOnly ? null : (
    <ButtonTT
      color="blue"
      onClick={completeStage}
      disabled={pendingCompleteStage}
    >
      {pendingCompleteStage ? <Loader show /> : 'Завершить этап'}
    </ButtonTT>
  );

  return (
    <PendingLoader loading={pending}>
      <Wrap>
        <CorrectionReadingsGate />
        {task?.id && <NextStagesGate taskId={task?.id} />}
        <Header>Введите исправленные показния</Header>
        <Space />
        {deviceDataString}
        <Space />
        {editTaskInfo}
        <Space h={5} />
        {inputReadings}
        {extraCheckingSelection}
        <Flex style={{ justifyContent: 'flex-end' }}>{endStageButton}</Flex>
      </Wrap>
    </PendingLoader>
  );
};
