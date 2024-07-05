import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared/LinkButton';
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
  ButtonSC,
  ZoneOption,
} from './CommonData.styled';
import { CommonDataProps } from './CommonData.types';
import { useFormik } from 'formik';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { configNamesLookup } from 'utils/configNamesLookup';
import { ENodeRegistrationType } from 'api/types';
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
import { TrashIconGrey } from 'ui-kit/icons';

const { inputs } = createNodeServiceZoneService;

export const CommonData: FC<CommonDataProps> = ({
  goPrevStep,
  nodeServiceZones,
  openCreateNodeServiceZoneModal,
  requestPayload,
  updateRequestPayload,
  handleDeleteServiceZone,
  successDeleteServiceZone,
}) => {
  const { values, handleChange, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: {
        configuration: requestPayload.configuration || null,
        title: requestPayload.title ? String(requestPayload.title) : '',
        registrationType: requestPayload?.registrationType || null,
        nodeServiceZoneName: null,
        commercialStatusRequest: requestPayload.commercialStatusRequest,
        communicationPipes: requestPayload.communicationPipes || [],
      },
      validationSchema,
      validateOnChange: false,
      onSubmit: (values) => {
        const {
          configuration,
          title,
          registrationType,
          nodeServiceZoneName,
          commercialStatusRequest,
          communicationPipes,
        } = values;

        if (
          !title ||
          !configuration ||
          !registrationType ||
          !communicationPipes
        ) {
          return;
        }

        const selectedZoneId = nodeServiceZones?.nodeServiceZones?.find(
          (zone) => zone.name === nodeServiceZoneName,
        )?.id;

        let payload: CreateNodeFormPayload = {
          configuration,
          title: title,
          nodeServiceZoneId: selectedZoneId,
          registrationType,
          communicationPipes,
        };

        if (registrationType === ENodeRegistrationType.Commercial) {
          payload = { ...payload, commercialStatusRequest };
        }

        updateRequestPayload(payload);
      },
    });

  useEffect(
    () =>
      successDeleteServiceZone.watch(() =>
        setFieldValue('nodeServiceZoneName', null),
      ).unsubscribe,
    [successDeleteServiceZone, setFieldValue],
  );

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
      </FirstLineWrapper>
      <FormItem label="Название узла">
        <Input
          placeholder="Введите"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <ErrorMessage>{errors.title}</ErrorMessage>
      </FormItem>
      <SecondLineWrapper>
        <FormItem label="Зона">
          <Select
            placeholder="Выберите"
            value={values.nodeServiceZoneName || undefined}
            onChange={(value) => setFieldValue('nodeServiceZoneName', value)}
            labelRender={(props) => props.value}
          >
            {nodeServiceZones?.nodeServiceZones?.map((zone) => (
              <Select.Option key={zone.id} value={zone.name}>
                <ZoneOption>
                  {zone.name}
                  <TrashIconGrey
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteServiceZone(zone);
                    }}
                  />
                </ZoneOption>
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.nodeServiceZoneName}</ErrorMessage>
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
        <ButtonSC onClick={() => handleSubmit()}>Далее</ButtonSC>
      </Footer>
    </>
  );
};
