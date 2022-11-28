import React, { FC, useEffect, useMemo } from 'react';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { DatePicker } from 'ui-kit/DatePicker';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  AddZoneText,
  ButtonSC,
  FooterWrapper,
  InfoWrapper,
  ResourceText,
  SelectWrapper,
  SwitchTextWrapper,
  SwitchWrapper,
  Wrapper,
} from './EditNodeCommonInfo.styled';
import {
  EditNodeCommonInfoProps,
  UpdatePipeNodeFormik,
} from './EditNodeCommonInfo.types';
import { useFormik } from 'formik';
import { ENodeCommercialAccountStatus } from 'myApi';
import moment from 'moment';
import { Form, Switch } from 'antd';
import { Button } from 'ui-kit/Button';

export const EditNodeCommonInfo: FC<EditNodeCommonInfoProps> = ({
  node,
  openAddNewZonesModal,
  nodeZones,
  formId,
}) => {
  const lastCommercialAccountingDate = useMemo(
    () => node.lastCommercialAccountingDate || moment().format(),
    [node]
  );
  const futureCommercialAccountingDate = useMemo(
    () =>
      node.futureCommercialAccountingDate || moment().add(4, 'year').format(),
    [node]
  );

  const {
    values,
    setFieldValue,
    handleSubmit,
  } = useFormik<UpdatePipeNodeFormik>({
    initialValues: {
      nodeServiceZoneId: node.nodeServiceZone?.id,
      number: String(node.number),
      nodeStatus: node.nodeStatus?.value,
      futureCommercialAccountingDate,
      lastCommercialAccountingDate,
    },
    enableReinitialize: true,
    onSubmit: console.log,
  });

  const selectZonesOptions = useMemo(
    () =>
      nodeZones.map((zone) => ({
        value: zone.id,
        label: zone.name,
      })),
    [nodeZones]
  );

  return (
    <Wrapper>
      <Form id={formId} onSubmitCapture={handleSubmit}>
        <FormItem label="Тип ресурса" className="resource">
          <Select
            placeholder="Выберите тип ресурса"
            value={node.resource}
            disabled
          >
            <Select.Option value={node.resource}>
              <SelectWrapper>
                <ResourceIconLookup resource={node.resource} />
                <ResourceText>{ResourceLookUp[node.resource]}</ResourceText>
              </SelectWrapper>
            </Select.Option>
          </Select>
        </FormItem>
        <InfoWrapper>
          <FormItem label="Номер узла">
            <Input
              placeholder="Номер узла"
              value={values.number}
              onChange={(e) => setFieldValue('number', e.target.value)}
              type="number"
            />
          </FormItem>

          <FormItem label="Статус узла">
            <Select value={values.nodeStatus}>
              <Select.Option value={ENodeCommercialAccountStatus.Registered}>
                Сдан на коммерческий учет
              </Select.Option>
              <Select.Option value={ENodeCommercialAccountStatus.NotRegistered}>
                Не на коммерческом учете
              </Select.Option>
              <Select.Option value={ENodeCommercialAccountStatus.OnReview}>
                На утверждении
              </Select.Option>
              <Select.Option value={ENodeCommercialAccountStatus.Prepared}>
                Подговлен к сдаче
              </Select.Option>
            </Select>
          </FormItem>
        </InfoWrapper>
        <FormItem label="Зона">
          <InfoWrapper>
            <Select
              value={values.nodeServiceZoneId || undefined}
              onChange={(chosenInputId) =>
                setFieldValue('nodeServiceZoneId', chosenInputId)
              }
              placeholder="Зона"
              options={selectZonesOptions}
            />
            <AddZoneText onClick={() => openAddNewZonesModal()}>
              + Добавить новую зону
            </AddZoneText>
          </InfoWrapper>
        </FormItem>

        <SwitchWrapper>
          <Switch />
          <SwitchTextWrapper>
            Коммерческий учет показателей приборов
          </SwitchTextWrapper>
        </SwitchWrapper>

        <FormItem label="Дата начала действия акта-допуска">
          <DatePicker
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            value={moment(values.lastCommercialAccountingDate)}
            allowClear={false}
            disabled
          />
        </FormItem>

        <FormItem label="Дата окончания действия акта-допуска">
          <DatePicker
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            allowClear={false}
            value={moment(values.futureCommercialAccountingDate)}
            disabled
          />
        </FormItem>
      </Form>

      <FooterWrapper>
        <Button onClick={() => handleSubmit()} type="ghost">
          Отмена
        </Button>

        <ButtonSC form={formId}>Сохранить</ButtonSC>
      </FooterWrapper>
    </Wrapper>
  );
};
