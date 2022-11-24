import React, { FC, useMemo } from 'react';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { DatePicker } from 'ui-kit/DatePicker';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  AddZoneText,
  InfoWrapper,
  ResourceText,
  SelectWrapper,
  Wrapper,
} from './EditNodeCommonInfo.styled';
import { EditNodeCommonInfoProps } from './EditNodeCommonInfo.types';
import { useFormik } from 'formik';

export const EditNodeCommonInfo: FC<EditNodeCommonInfoProps> = ({
  node,
  openAddNewZonesModal,
  nodeZones,
}) => {
  const { values } = useFormik({
    initialValues: {
      resource: node.resource,
      nodeServiceZoneId: node.nodeServiceZone?.id,
      number: node.number,
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
      <FormItem label="Тип ресурса" className="resource">
        <Select
          placeholder="Выберите тип ресурса"
          value={values.resource}
          disabled
        >
          <Select.Option value={values.resource}>
            <SelectWrapper>
              <ResourceIconLookup resource={values.resource} />
              <ResourceText>{ResourceLookUp[values.resource]}</ResourceText>
            </SelectWrapper>
          </Select.Option>
        </Select>
      </FormItem>

      <InfoWrapper>
        <FormItem label="Номер узла">
          <Input placeholder="Номер узла" name="number" />
        </FormItem>

        <FormItem label="Статус узла">
          <Select></Select>
        </FormItem>

        <FormItem label="Зона">
          <Select
            // onChange={(chosenInputId) => {
            //   setChosenInput(+chosenInputId);
            // }}
            placeholder="Зона"
            options={selectZonesOptions}
            // value={chosenInputForSelect?.value}
          />
        </FormItem>
        <AddZoneText onClick={() => openAddNewZonesModal()}>
          + Добавить новую зону
        </AddZoneText>
      </InfoWrapper>

      <FormItem label="Коммерческий учет показателей приборов">
        <Select placeholder="Коммерческий учет показателей приборов" />
      </FormItem>

      <>
        <FormItem
          label="Дата начала действия акта-допуска"
          // message: 'Выберите Дата начала действия акта-допуска',
        >
          {/* <DatePicker
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            allowClear={false}
            onChange={(value) => {
              setFieldsValue({
                futureCommercialAccountingDate: moment(value).add(4, 'years'),
              });
            }}
          /> */}
        </FormItem>

        <FormItem
          label="Дата окончания действия акта-допуска"
          // message: 'Выберите Дата окончания действия акта-допуска',
        >
          <DatePicker
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            allowClear={false}
          />
        </FormItem>
      </>
    </Wrapper>
  );
};
