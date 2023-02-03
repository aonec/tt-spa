import React, { FC, useMemo } from 'react';
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
  ZoneWrapper,
} from './EditNodeCommonInfo.styled';
import { EditNodeCommonInfoProps } from './EditNodeCommonInfo.types';
import { useFormik } from 'formik';
import { UpdatePipeNodeRequest } from 'myApi';
import moment from 'moment';
import { Form } from 'antd';
import { Button } from 'ui-kit/Button';
import { useHistory } from 'react-router-dom';
import { configNamesLookup } from 'utils/configNamesLookup';

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

  const { values, setFieldValue, handleSubmit } =
    useFormik<UpdatePipeNodeRequest>({
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
    [nodeZones],
  );

  return (
    <>
      <Form id={formId} onSubmitCapture={handleSubmit}>
        <InfoWrapper>
          <FormItem label="Конфигурация" className="resource">
            <Select
              placeholder="Выберите конфигурацию"
              value={node.configuration}
              disabled
            >
              <Select.Option value={node.configuration}>
                  <ResourceText>{configNamesLookup[node.configuration]}</ResourceText>
              </Select.Option>
            </Select>
          </FormItem>
          <FormItem label="Номер узла">
            <Input
              placeholder="Номер узла"
              value={String(values.number)}
              onChange={(e) => setFieldValue('number', Number(e.target.value))}
              type="number"
            />
          </FormItem>
        </InfoWrapper>
        <FormItem label="Зона">
          <ZoneWrapper>
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
          </ZoneWrapper>
        </FormItem>

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
    </>
  );
};
