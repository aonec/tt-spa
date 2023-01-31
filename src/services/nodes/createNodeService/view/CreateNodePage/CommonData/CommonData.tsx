import React, { FC, useEffect } from 'react';
import { Button } from 'ui-kit/Button';
import { DatePicker } from 'ui-kit/DatePicker';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import {
  commercialNodeStatuses,
  nodeResources,
  nodeStatuses,
  validationSchema,
} from './CommonData.constants';
import { createNodeServiceZoneService } from 'services/nodes/createNodeServiceZoneService';
import {
  CreateNewZoneButtonWrapper,
  FilesUploaderWrapper,
  FirstLineWrapper,
  SelectOptionWithIconWrapper,
  SecondLineWrapper,
  ThirdLineWrapper,
} from './CommonData.styled';
import { CommonDataProps } from './CommonData.types';
import { useFormik } from 'formik';
import { Document } from 'ui-kit/DocumentsService/DocumentsService.types';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { getInitialDateFieldValue, getNodeStatus } from './CommonData.utils';
import { ENodeRegistrationType } from 'myApi';

const { inputs } = createNodeServiceZoneService;

export const CommonData: FC<CommonDataProps> = ({
  goPrevStep,
  nodeServiceZones,
  openCreateNodeServiceZoneModal,
  requestPayload,
  updateRequestPayload,
}) => {
  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      // resource: requestPayload.resource || null,
      number: requestPayload.number ? String(requestPayload.number) : '',
      nodeStatus: getNodeStatus(requestPayload?.commercialStatus),
      nodeServiceZoneId: requestPayload.nodeServiceZoneId || null,
      startCommercialAccountingDate: getInitialDateFieldValue(
        requestPayload.startCommercialAccountingDate
      ),
      endCommercialAccountingDate: getInitialDateFieldValue(
        requestPayload.endCommercialAccountingDate
      ),
      documents: [] as Document[],
      commercialStatus: requestPayload.commercialStatus || null,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      const {
        // resource,
        number,
        commercialStatus,
        nodeServiceZoneId,
        startCommercialAccountingDate,
        endCommercialAccountingDate,
      } = values;

      if (!number || !nodeServiceZoneId) return;

      updateRequestPayload({
        // resource,
        number: Number(number),
        commercialStatus,
        nodeServiceZoneId,
        startCommercialAccountingDate: startCommercialAccountingDate?.toISOString(
          true
        ),
        endCommercialAccountingDate: endCommercialAccountingDate?.toISOString(
          true
        ),
      });
    },
  });

  useEffect(
    () =>
      inputs.handleServiceZoneCreated.watch((nodeServiceZone) =>
        setFieldValue('nodeServiceZoneId', nodeServiceZone.id)
      ).unsubscribe,
    []
  );

  return (
    <div>
      <Title>Общие данные об узле</Title>
      <FirstLineWrapper>
        <FormItem label="Ресурс">
          {/* <Select
            placeholder="Выберите"
            value={values.resource || undefined}
            onChange={(value) => setFieldValue('resource', value)}
          >
            {nodeResources.map(({ resource, text }) => (
              <Select.Option key={resource} value={resource}>
                <SelectOptionWithIconWrapper>
                  <ResourceIconLookup resource={resource} />
                  <div>{text}</div>
                </SelectOptionWithIconWrapper>
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.resource}</ErrorMessage> */}
        </FormItem>
        <FormItem label="Тип узла">
          <Select
            placeholder="Выберите"
            value={values.nodeStatus || undefined}
            onChange={(value) => {
              setFieldValue('nodeStatus', value);
              if (value === ENodeRegistrationType.Technical) {
                setFieldValue('commercialStatus', null);
              }
            }}
          >
            {Object.entries(nodeStatuses).map(([value, text]) => (
              <Select.Option key={value} value={value}>
                <div>{text}</div>
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.nodeStatus}</ErrorMessage>
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
      {values.nodeStatus &&
        values.nodeStatus !== ENodeRegistrationType.Technical && (
          <>
            <FormItem label="Статус узла">
              <Select
                placeholder="Выберите"
                value={values.commercialStatus || undefined}
                onChange={(value) => setFieldValue('commercialStatus', value)}
              >
                {commercialNodeStatuses.map(({ nodeStatus, text, Icon }) => (
                  <Select.Option key={nodeStatus} value={nodeStatus}>
                    <SelectOptionWithIconWrapper>
                      <Icon />
                      <div>{text}</div>
                    </SelectOptionWithIconWrapper>
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage>{errors.commercialStatus}</ErrorMessage>
            </FormItem>

            <ThirdLineWrapper>
              <FormItem label="Дата начала действия акта-допуска">
                <DatePicker
                  value={values.startCommercialAccountingDate || undefined}
                  onChange={(value) =>
                    setFieldValue('startCommercialAccountingDate', value)
                  }
                  format="DD.MM.YYYY"
                  placeholder="Введите дату"
                />
              </FormItem>
              <FormItem label="Дата окончания действия акта-допуска">
                <DatePicker
                  value={values.endCommercialAccountingDate || undefined}
                  onChange={(value) =>
                    setFieldValue('endCommercialAccountingDate', value)
                  }
                  format="DD.MM.YYYY"
                  placeholder="Введите дату"
                />
              </FormItem>
            </ThirdLineWrapper>

            <FilesUploaderWrapper>
              <DocumentsUploadContainer
                label="Добавьте акт-допуска"
                documents={values.documents}
                uniqId="edit-apartment-act-form"
                onChange={(documents) => setFieldValue('documents', documents)}
                max={1}
              />
            </FilesUploaderWrapper>
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
    </div>
  );
};
