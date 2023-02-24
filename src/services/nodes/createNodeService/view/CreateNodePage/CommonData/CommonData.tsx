import React, { FC, useCallback, useEffect } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { nodeStatuses, validationSchema } from './CommonData.constants';
import { createNodeServiceZoneService } from 'services/nodes/createNodeServiceZoneService';
import {
  CreateNewZoneButtonWrapper,
  FirstLineWrapper,
  SelectOptionWithIconWrapper,
  SecondLineWrapper,
} from './CommonData.styled';
import { CommonDataProps } from './CommonData.types';
import { useFormik } from 'formik';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { configNamesLookup } from 'utils/configNamesLookup';
import { ENodeRegistrationType } from 'myApi';
import { ChangeNodeStatusForm } from 'services/nodes/changeNodeStatusService/view/ChangeNodeStatusForm';
import { getChangeNodeStatusPayload } from 'services/nodes/changeNodeStatusService/changeNodeStatusService.utils';
import { ChangeNodeStatusFormPayload } from 'services/nodes/changeNodeStatusService/changeNodeStatusService.types';

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
        technicalTypeRequest: requestPayload.technicalTypeRequest,
        commercialStatusRequest: requestPayload.commercialStatusRequest,
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
        } = values;

        if (
          !number ||
          !nodeServiceZoneId ||
          !configuration ||
          !registrationType
        ) {
          return;
        }
        if (registrationType === ENodeRegistrationType.Commercial) {
          updateRequestPayload({ commercialStatusRequest });
        }

        updateRequestPayload({
          configuration,
          number: Number(number),
          nodeServiceZoneId,
          registrationType,
        });
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
            {Object.entries(nodeStatuses).map(([value, text]) => (
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
      {values.registrationType &&
        values.registrationType !== ENodeRegistrationType.Technical && (
          <>
            <ChangeNodeStatusForm
              handleChangeNodeStatus={handleChangeCommercialStatus}
              createMode={true}
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
