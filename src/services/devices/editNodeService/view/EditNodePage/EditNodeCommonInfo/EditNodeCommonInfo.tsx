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
import { EditNodeCommonInfoProps } from './EditNodeCommonInfo.types';
import { useFormik } from 'formik';
import { ENodeCommercialAccountStatus, UpdatePipeNodeRequest } from 'myApi';
import moment from 'moment';
import { Form, Switch } from 'antd';
import { Button } from 'ui-kit/Button';
import { useHistory } from 'react-router-dom';

export const EditNodeCommonInfo: FC<EditNodeCommonInfoProps> = ({
  node,
  openAddNewZonesModal,
  nodeZones,
  formId,
  updateNode,
}) => {
  const history = useHistory();

  const futureCommercialAccountingDate = node.futureCommercialAccountingDate
    ? moment(node.futureCommercialAccountingDate)
    : undefined;

  const lastCommercialAccountingDate = node.lastCommercialAccountingDate
    ? moment(node.lastCommercialAccountingDate)
    : undefined;

  const isChecked =
    node.nodeStatus?.value !== ENodeCommercialAccountStatus.NotRegistered;

  const {
    values,
    setFieldValue,
    handleSubmit,
  } = useFormik<UpdatePipeNodeRequest>({
    initialValues: {
      nodeServiceZoneId: node.nodeServiceZone?.id,
      number: node.number,
    },
    enableReinitialize: true,
    onSubmit: (values) => updateNode(values),
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
              value={String(values.number)}
              onChange={(e) => setFieldValue('number', Number(e.target.value))}
              type="number"
            />
          </FormItem>

          <FormItem label="Статус узла">
            <Select value={node.nodeStatus?.value} disabled>
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
          <Switch disabled checked={isChecked} />
          <SwitchTextWrapper>
            Коммерческий учет показателей приборов
          </SwitchTextWrapper>
        </SwitchWrapper>

        <FormItem label="Дата начала действия акта-допуска">
          <DatePicker
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            value={lastCommercialAccountingDate}
            allowClear={false}
            disabled
          />
        </FormItem>

        <FormItem label="Дата окончания действия акта-допуска">
          <DatePicker
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            allowClear={false}
            value={futureCommercialAccountingDate}
            disabled
          />
        </FormItem>
      </Form>

      <FooterWrapper>
        <Button type="ghost" onClick={() => history.goBack()}>
          Отмена
        </Button>

        <ButtonSC onClick={() => handleSubmit()}>Сохранить</ButtonSC>
      </FooterWrapper>
    </Wrapper>
  );
};
