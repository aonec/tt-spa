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
import { nodeResources, nodeStatuses } from './CommonData.contstants';
import {
  CreateNodeServiceZoneContainer,
  createNodeServiceZoneService,
} from 'services/nodes/createNodeServiceZoneService';
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
import { ENodeCommercialAccountStatus, EResourceType } from 'myApi';
import moment from 'moment';
import { Document } from 'ui-kit/DocumentsService/DocumentsService.types';

const { inputs } = createNodeServiceZoneService;

export const CommonData: FC<CommonDataProps> = ({
  goPrevStep,
  nodeServiceZones,
  openCreateNodeServiceZoneModal,
}) => {
  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      resource: null as EResourceType | null,
      number: '',
      nodeStatus: null as ENodeCommercialAccountStatus | null,
      nodeServiceZoneId: null as number | null,
      startCommercialAccountingDate: null as moment.Moment | null,
      endCommercialAccountingDate: null as moment.Moment | null,
      documents: [] as Document[],
    },
    onSubmit: () => {},
  });

  useEffect(
    () =>
      inputs.handleServiceZoneCreated.watch((nodeServiceZone) =>
        setFieldValue('nodeServiceZoneId', nodeServiceZone.id)
      ).unsubscribe,
    []
  );

  return (
    <>
      <CreateNodeServiceZoneContainer />
      <div>
        <Title>Общие данные об узле</Title>
        <FirstLineWrapper>
          <FormItem label="Ресурс">
            <Select
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
          </FormItem>
          <FormItem label="Номер узла">
            <Input
              placeholder="Введите"
              name="number"
              value={values.number}
              onChange={handleChange}
            />
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
          </FormItem>
          <CreateNewZoneButtonWrapper>
            <LinkButton onClick={openCreateNodeServiceZoneModal}>
              + Создать новую зону
            </LinkButton>
          </CreateNewZoneButtonWrapper>
        </SecondLineWrapper>
        <FormItem label="Коммерческий учет показателей приборов">
          <Select
            placeholder="Выберите"
            value={values.nodeStatus || undefined}
            onChange={(value) => setFieldValue('nodeStatus', value)}
          >
            {nodeStatuses.map(({ nodeStatus, text, Icon }) => (
              <Select.Option key={nodeStatus} value={nodeStatus}>
                <SelectOptionWithIconWrapper>
                  <Icon />
                  <div>{text}</div>
                </SelectOptionWithIconWrapper>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        {values.nodeStatus === ENodeCommercialAccountStatus.Registered && (
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
        )}
        <FilesUploaderWrapper>
          <DocumentsUploadContainer
            label="Добавьте акт-допуска"
            documents={values.documents}
            uniqId="edit-apartment-act-form"
            onChange={(documents) => setFieldValue('documents', documents)}
            max={1}
          />
        </FilesUploaderWrapper>
        <Footer>
          <Button type="ghost" onClick={goPrevStep}>
            Назад
          </Button>
          <Button sidePadding={20} onClick={() => {}}>
            Далее
          </Button>
        </Footer>
      </div>
    </>
  );
};
