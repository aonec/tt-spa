import { useForm } from 'effector-forms';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  addIndividualDeviceForm,
  SwitchIndividualDeviceGate,
} from '../../models';
import { ReadingsInput } from '../ReadingsInput';
import { Space } from '01/shared/ui/Layout/Space/Space';

import { Loader } from 'ui-kit/Loader';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';


const {
  outputs: {
    $individualDevice,
    $isIndividualDeviceLoading,
    $individualDevicesNames,
  },
  gates: { IndividualDevicecModelsGate },
} = displayIndividualDeviceAndNamesService;

export const BaseInfoStage = () => {

  const modelNames = useStore($individualDevicesNames);
  const device = useStore($individualDevice);
  const { fields, set } = useForm(addIndividualDeviceForm);
  const type = useStore(
    SwitchIndividualDeviceGate.state.map(({ type }) => type),
  );
  const isCheck = type === 'check';
  const isReopen = type === 'reopen';
  const isSwitch = type === 'switch';

  const pending = useStore($isIndividualDeviceLoading);

  const modelNameDebounced = fields.model.value;

  const titleOfInput = useMemo(() => {
    if (isSwitch) {
      return 'Заменяемый прибор';
    }
    if (isCheck) {
      return 'Прибор до поверки';
    }
    if (isReopen) {
      return 'Прибор до переоткрытия';
    }
    return '';
  }, [isSwitch, isCheck, isReopen]);

  const readingInputs = device && (
    <div style={{ margin: '10px 0' }}>
      {!isCheck && (
        <>
          <ReadingsInput
            title={titleOfInput}
            readings={fields.oldDeviceReadings.value}
            onChange={fields.oldDeviceReadings.onChange}
            device={device}
          />
          <Space />
        </>
      )}
      <ReadingsInput
        title={
          isSwitch
            ? 'Новый прибор'
            : isCheck
            ? 'Прибор после поверки'
            : isReopen
            ? 'Прибор после переоткрытия'
            : ''
        }
        readings={fields.newDeviceReadings.value}
        onChange={fields.newDeviceReadings.onChange}
        device={{
          resource: fields.resource.value!,
          model: fields.model.value,
          serialNumber: fields.serialNumber.value,
          measurableUnitString: device?.measurableUnitString,
          rateType: fields.rateType.value,
        }}
      />
      <ErrorMessage>
        {fields.newDeviceReadings.errorText({
          required: 'Заполните хотя бы одно показание',
        })}
      </ErrorMessage>
    </div>
  );

  const form = <>{readingInputs}</>;

  return (
    <Wrap>
      <IndividualDevicecModelsGate model={modelNameDebounced} />

      {/* {!isCheck && <FormHeader>Общие данные о приборе</FormHeader>} */}

      {pending ? <Loader show size={32} /> : form}
    </Wrap>
  );
};

const ErrorMessage = styled.div`
  margin-top: 5px;
  color: red;
`;

const Wrap = styled.div`
  margin-bottom: -10px;
`;
