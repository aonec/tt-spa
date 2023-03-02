import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { validationSchema } from './CommonData.constants';
import { createNodeServiceZoneService } from 'services/nodes/createNodeServiceZoneService';
import {
  CreateNewZoneButtonWrapper,
  FirstLineWrapper,
  SelectOptionWithIconWrapper,
  SecondLineWrapper,
  Divider,
} from './CommonData.styled';
import { CommonDataProps } from './CommonData.types';
import { useFormik } from 'formik';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { configNamesLookup } from 'utils/configNamesLookup';
import { ENodeRegistrationType } from 'myApi';
import { ChangeNodeStatusForm } from 'services/nodes/changeNodeStatusService/view/ChangeNodeStatusForm';
import { getChangeNodeStatusPayload } from 'services/nodes/changeNodeStatusService/changeNodeStatusService.utils';
import { ChangeNodeStatusFormPayload } from 'services/nodes/changeNodeStatusService/changeNodeStatusService.types';
import { NodeRegistrationTypeLookup } from 'dictionaries';
import {
  getInitialDataForChangeNodeStatusForm,
  getInitialPipesFromConfig,
} from './CommonData.utils';
import { ConfiguratePipe } from './ConfiguratePipe';
import { CreateNodeFormPayload } from 'services/nodes/createNodeService/createNodeService.types';

const { inputs } = createNodeServiceZoneService;

export const CommonData: FC<CommonDataProps> = ({
  goPrevStep,
  nodeServiceZones,
  openCreateNodeServiceZoneModal,
  requestPayload,
  updateRequestPayload,
}) => {
  const { values, handleChange, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: {
        configuration: requestPayload.configuration || null,
        number: requestPayload.number ? String(requestPayload.number) : '',
        registrationType: requestPayload?.registrationType || null,
        nodeServiceZoneId: requestPayload.nodeServiceZoneId || null,
        commercialStatusRequest: requestPayload.commercialStatusRequest,
        communicationPipes: requestPayload.communicationPipes || [],
      },
      validationSchema,
      validateOnChange: false,
      onSubmit: (values) => {
        const {
          configuration,
          number,
          registrationType,
          nodeServiceZoneId,
          commercialStatusRequest,
          communicationPipes,
        } = values;

        if (
          !number ||
          !nodeServiceZoneId ||
          !configuration ||
          !registrationType ||
          !communicationPipes
        ) {
          return;
        }

        let payload: CreateNodeFormPayload = {
          configuration,
          number: Number(number),
          nodeServiceZoneId,
          registrationType,
          communicationPipes,
        };

        if (registrationType === ENodeRegistrationType.Commercial) {
          payload = { ...payload, commercialStatusRequest };
        }

        updateRequestPayload(payload);
      },
    });

  const handleChangeCommercialStatus = useCallback(
    (commercialStatusRequest: ChangeNodeStatusFormPayload) =>
      setFieldValue(
        'commercialStatusRequest',
        getChangeNodeStatusPayload(commercialStatusRequest),
      ),
    [setFieldValue],
  );

  const pipesErrors = useMemo(
    () =>
      (errors as unknown as CreateNodeFormPayload)?.communicationPipes || [],
    [errors],
  );

  const handleChangeNumberOfPipe = useCallback(
    (id: string, number: number) =>
      values.communicationPipes.map((pipe) => {
        if (pipe.id !== id) {
          return pipe;
        }
        return { ...pipe, number };
      }),
    [values.communicationPipes],
  );

  const handleChangeDiameterOfPipe = useCallback(
    (id: string, diameter: number) =>
      values.communicationPipes.map((pipe) => {
        if (pipe.id !== id) {
          return pipe;
        }
        return { ...pipe, diameter };
      }),
    [values.communicationPipes],
  );

  useEffect(
    () =>
      inputs.handleServiceZoneCreated.watch((nodeServiceZone) =>
        setFieldValue('nodeServiceZoneId', nodeServiceZone.id),
      ).unsubscribe,
    [setFieldValue],
  );

  useEffect(() => {
    if (values.registrationType === ENodeRegistrationType.Technical) {
      setFieldValue('commercialStatusRequest', undefined);
      return;
    }
  }, [values.registrationType, setFieldValue]);

  useEffect(() => {
    if (values.configuration) {
      setFieldValue(
        'communicationPipes',
        getInitialPipesFromConfig(values.configuration),
      );
    }
  }, [values.configuration, setFieldValue]);

  useEffect(() => {
    if (requestPayload.communicationPipes) {
      setFieldValue('communicationPipes', requestPayload.communicationPipes);
    }
  }, [setFieldValue, requestPayload.communicationPipes]);

  return (
    <>
      <Title>Общие данные об узле</Title>
      <FirstLineWrapper>
        <FormItem label="Конфигурация">
          <Select
            placeholder="Выберите"
            value={values.configuration || undefined}
            onChange={(value) => setFieldValue('configuration', value)}
          >
            {Object.entries(configNamesLookup).map(([configuration, text]) => (
              <Select.Option key={configuration} value={configuration}>
                <SelectOptionWithIconWrapper>
                  <div>{text}</div>
                </SelectOptionWithIconWrapper>
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.configuration}</ErrorMessage>
        </FormItem>
        <FormItem label="Тип узла">
          <Select
            placeholder="Выберите"
            value={values.registrationType || undefined}
            onChange={(value) => setFieldValue('registrationType', value)}
          >
            {Object.entries(NodeRegistrationTypeLookup).map(([value, text]) => (
              <Select.Option key={value} value={value}>
                <div>{text}</div>
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.registrationType}</ErrorMessage>
        </FormItem>
        <FormItem label="Номер узла">
          <Input
            placeholder="Введите"
            name="number"
            type="number"
            value={values.number}
            onChange={handleChange}
          />
          <ErrorMessage>{errors.number}</ErrorMessage>
        </FormItem>
      </FirstLineWrapper>
      <SecondLineWrapper>
        <FormItem label="Зона">
          <Select
            placeholder="Выберите"
            value={values.nodeServiceZoneId || undefined}
            onChange={(value) => setFieldValue('nodeServiceZoneId', value)}
          >
            {nodeServiceZones?.nodeServiceZones?.map((zone) => (
              <Select.Option key={zone.id} value={zone.id}>
                {zone.name}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.nodeServiceZoneId}</ErrorMessage>
        </FormItem>
        <CreateNewZoneButtonWrapper>
          <LinkButton onClick={openCreateNodeServiceZoneModal}>
            + Создать новую зону
          </LinkButton>
        </CreateNewZoneButtonWrapper>
      </SecondLineWrapper>

      {Boolean(values.communicationPipes.length) && <Divider />}

      {values.communicationPipes.map((pipe, index) => (
        <>
          <ConfiguratePipe
            key={pipe.id}
            pipe={pipe}
            index={index + 1}
            handleChangeNumber={(number) =>
              setFieldValue(
                'communicationPipes',
                handleChangeNumberOfPipe(pipe.id, number),
              )
            }
            handleChangeDiameter={(diameter) =>
              setFieldValue(
                'communicationPipes',
                handleChangeDiameterOfPipe(pipe.id, diameter),
              )
            }
          />
          <ErrorMessage>
            {Object.values(pipesErrors?.[index] || {}).join(', ')}
          </ErrorMessage>
        </>
      ))}

      {values.registrationType &&
        values.registrationType !== ENodeRegistrationType.Technical && (
          <>
            <Divider />
            <ChangeNodeStatusForm
              handleChangeNodeStatus={handleChangeCommercialStatus}
              createMode={true}
              initialData={getInitialDataForChangeNodeStatusForm(
                values.commercialStatusRequest,
              )}
            />
            <ErrorMessage>
              {Object.values(errors.commercialStatusRequest || {}).join(', ')}
            </ErrorMessage>
          </>
        )}

      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20} onClick={() => handleSubmit()}>
          Далее
        </Button>
      </Footer>
    </>
  );
};
