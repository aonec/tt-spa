import { Loader } from '01/components';
import {
  DeviceDataString,
} from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { ButtonTT } from '01/tt-components';
import IsActive from '01/tt-components/IsActive';
import { translateMountPlace } from '01/utils/translateMountPlace';
import { DateLine } from '01/_components/DateLine/DateLine';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { ReadingsHistoryButton } from '01/_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { Form, message } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NextStagesGate } from '../displayNextStages/models';
import { $task, fetchTaskFx, TaskGate } from '../displayTask/models';
import { pushStageFx } from '../pushingStage/models';
import { Header, InfoBlock, ReadingInputStyled, Wrap } from './CorrectionReadings.styled';
import {
  correctionReadingsForm,
  CorrectionReadingsGate,
  completeStage,
} from './models';

export const CorrectionReadingsPanel = () => {
  const params = useParams<[string]>();

  const task = useStore($task);

  const device = task?.individualDevice!;
  const problemReading = device?.readings && device?.readings[0];

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

  const editTaskInfo = (
    <Grid temp="0.7fr 0.5fr 0.8fr 1.2fr" gap="15px">
      <InfoBlock
        title="Некорректные показания"
        value={problemReading?.value1!}
        color="red"
      />
      <InfoBlock
        title="Период"
        value={moment(problemReading?.readingDate).format('MMMM YYYY')}
      />
      <InfoBlock title="Оператор" value={problemReading?.user?.name!} />
      <InfoBlock title="Причина ошибки" value={task?.creationReason!} />
    </Grid>
  );

  const rateNum = getIndividualDeviceRateNumByName(device?.rateType) || 0;
  const readingValues = getArrayByCountRange(
    rateNum,
    (count) => (fields.readingValue.value as any)[`value${count}`]
  );

  const isReadOnly = !task?.isPerpertator;

  const actions = task?.currentStage?.actions;

  const inputReadings = device && (
    <Form.Item label="Исправленные показания">
      <Grid temp="1fr" gap="10px">
        {[...readingValues].map((elem, index) => (
          <ReadingInputStyled
            disabled={isReadOnly}
            placeholder={`T${index + 1}`}
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
        ))}
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
        <ReadingsHistoryModal />
        <TaskGate id={Number(params[0])} />
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