import React, { FC, useCallback, useMemo } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import {
  AddZoneText,
  ButtonSC,
  FooterWrapper,
  InfoWrapper,
  ResourceText,
  ZoneWrapper,
} from './EditNodeCommonInfo.styled';
import { EditNodeCommonInfoProps } from './EditNodeCommonInfo.types';
import { useFormik } from 'formik';
import moment from 'moment';
import { Form } from 'antd';
import { Button } from 'ui-kit/Button';
import { useHistory } from 'react-router-dom';
import { configNamesLookup } from 'utils/configNamesLookup';
import { ConfiguratePipe } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/ConfiguratePipe';
import { CommunicationPipeResponse, EMagistralType } from 'api/types';
import { validationSchema } from './EditNodeCommonInfo.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { filterCommunicationPipes } from './EditNodeCommonInfo.utils';
import { Divider } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/CommonData.styled';

export const EditNodeCommonInfo: FC<EditNodeCommonInfoProps> = ({
  node,
  openAddNewZonesModal,
  nodeZones,
  formId,
  updateNode,
  isLoading,
}) => {
  const history = useHistory();

  const futureCommercialAccountingDate = node.futureCommercialAccountingDate
    ? moment(node.futureCommercialAccountingDate)
    : undefined;

  const lastCommercialAccountingDate = node.lastCommercialAccountingDate
    ? moment(node.lastCommercialAccountingDate)
    : undefined;

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      nodeServiceZoneId: node.nodeServiceZone?.id,
      number: node.number,
      communicationPipes: node.communicationPipes || [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const communicationPipes = values.communicationPipes.filter((pipe) =>
        filterCommunicationPipes({
          newPipe: pipe,
          oldPipes: node.communicationPipes || [],
        }),
      );

      updateNode({
        ...values,
        communicationPipes: communicationPipes.map((pipe) => ({
          ...pipe,
          communicationPipeId: pipe.id,
        })),
      });
    },
  });

  const selectZonesOptions = useMemo(
    () =>
      nodeZones.map((zone) => ({
        value: zone.id,
        label: zone.name,
      })),
    [nodeZones],
  );

  const pipesErrors = useMemo(
    () =>
      (errors as unknown as { communicationPipes: CommunicationPipeResponse[] })
        ?.communicationPipes || [],
    [errors],
  );

  const handleChangeNumberOfPipe = useCallback(
    (id: string, number: number) =>
      (values.communicationPipes || []).map((pipe) => {
        if (String(pipe?.id) !== id) {
          return pipe;
        }
        return { ...pipe, number };
      }),
    [values.communicationPipes],
  );

  const handleChangeDiameterOfPipe = useCallback(
    (id: string, diameter: number) =>
      (values.communicationPipes || []).map((pipe) => {
        if (String(pipe.id) !== id) {
          return pipe;
        }
        return { ...pipe, diameter };
      }),
    [values.communicationPipes],
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
                <ResourceText>
                  {configNamesLookup[node.configuration]}
                </ResourceText>
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

        {Boolean(values.communicationPipes.length) && <Divider />}
        {(values.communicationPipes || []).map((pipe, index) => {
          const { id, diameter, number, magistral } = pipe;

          return (
            <>
              <ConfiguratePipe
                pipe={{
                  number: number || undefined,
                  diameter: diameter || undefined,
                  id: String(id),
                  magistral: magistral as EMagistralType,
                }}
                index={index + 1}
                key={pipe.id}
                handleChangeNumber={(number) =>
                  setFieldValue(
                    'communicationPipes',
                    handleChangeNumberOfPipe(String(id), number),
                  )
                }
                handleChangeDiameter={(diameter) =>
                  setFieldValue(
                    'communicationPipes',
                    handleChangeDiameterOfPipe(String(id), diameter),
                  )
                }
              />
              <ErrorMessage>
                {Object.values(pipesErrors?.[index] || {}).join(', ')}
              </ErrorMessage>
            </>
          );
        })}

        {lastCommercialAccountingDate && (
          <FormItem label="Дата начала действия акта-допуска">
            <DatePicker
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              value={lastCommercialAccountingDate}
              allowClear={false}
              disabled
            />
          </FormItem>
        )}

        {futureCommercialAccountingDate && (
          <FormItem label="Дата окончания действия акта-допуска">
            <DatePicker
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              allowClear={false}
              value={futureCommercialAccountingDate}
              disabled
            />
          </FormItem>
        )}
      </Form>

      <FooterWrapper>
        <Button type="ghost" onClick={() => history.goBack()}>
          Отмена
        </Button>

        <ButtonSC isLoading={isLoading} onClick={() => handleSubmit()}>
          Сохранить
        </ButtonSC>
      </FooterWrapper>
    </>
  );
};
