import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import {
  AddZoneText,
  ButtonSC,
  DialogDescription,
  FooterWrapper,
  InfoWrapper,
  ResourceText,
  ZoneOption,
  ZoneWrapper,
} from './EditNodeCommonInfo.styled';
import { EditNodeCommonInfoProps } from './EditNodeCommonInfo.types';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import { Form } from 'antd';
import { Button } from 'ui-kit/Button';
import { useNavigate } from 'react-router-dom';
import { configNamesLookup } from 'utils/configNamesLookup';
import { ConfiguratePipe } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/ConfiguratePipe';
import { CommunicationPipeResponse, EMagistralType } from 'api/types';
import { validationSchema } from './EditNodeCommonInfo.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { filterCommunicationPipes } from './EditNodeCommonInfo.utils';
import { Divider } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/CommonData.styled';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { TrashIconGrey } from 'ui-kit/icons';

export const EditNodeCommonInfo: FC<EditNodeCommonInfoProps> = ({
  node,
  openAddNewZonesModal,
  nodeZones,
  formId,
  updateNode,
  isLoading,
  deletingServiceZone,
  handleDeleteServiceZone,
  handleFinallyDeleteServiceZone,
  isDeleteServiceZoneDialogOpen,
  successDeleteServiceZone,
}) => {
  const navigate = useNavigate();

  const futureCommercialAccountingDate = node.futureCommercialAccountingDate
    ? dayjs(node.futureCommercialAccountingDate)
    : undefined;

  const lastCommercialAccountingDate = node.lastCommercialAccountingDate
    ? dayjs(node.lastCommercialAccountingDate)
    : undefined;

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      nodeServiceZoneName: node.nodeServiceZone?.name,
      title: node.title,
      communicationPipes: node.communicationPipes || [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const selectedZoneId = nodeZones.find(
        (zone) => zone.name === values.nodeServiceZoneName,
      )?.id;

      const communicationPipes = values.communicationPipes.filter((pipe) =>
        filterCommunicationPipes({
          newPipe: pipe,
          oldPipes: node.communicationPipes || [],
        }),
      );

      updateNode({
        title: node.title,
        nodeServiceZoneId: selectedZoneId,
        communicationPipes: communicationPipes.map((pipe) => ({
          ...pipe,
          communicationPipeId: pipe.id,
        })),
      });
    },
  });

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

  useEffect(
    () =>
      successDeleteServiceZone.watch(() =>
        setFieldValue('nodeServiceZoneName', null),
      ).unsubscribe,
    [successDeleteServiceZone, setFieldValue],
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
          <FormItem label="Название узла">
            <Input
              placeholder="Название узла"
              value={values.title || undefined}
              onChange={(e) => setFieldValue('title', e.target.value)}
            />
          </FormItem>
        </InfoWrapper>
        <FormItem label="Зона">
          <ZoneWrapper>
            <Select
              placeholder="Зона"
              value={values.nodeServiceZoneName || undefined}
              onChange={(value) => setFieldValue('nodeServiceZoneName', value)}
              labelRender={(props) => props.value}
            >
              {nodeZones.map((zone) => (
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
              format={{ format: 'DD.MM.YYYY', type: 'mask' }}
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
              format={{ format: 'DD.MM.YYYY', type: 'mask' }}
              placeholder="Укажите дату..."
              allowClear={false}
              value={futureCommercialAccountingDate}
              disabled
            />
          </FormItem>
        )}
      </Form>

      <FooterWrapper>
        <Button type="ghost" onClick={() => navigate(-1)}>
          Отмена
        </Button>

        <ButtonSC isLoading={isLoading} onClick={() => handleSubmit()}>
          Сохранить
        </ButtonSC>
      </FooterWrapper>

      <Dialog
        width={600}
        title={`Вы уверены, что хотите удалить зону “${deletingServiceZone?.name}”?`}
        description={
          <DialogDescription>
            <div>
              Это зона используется на других узлах. При удалении зона будет
              автоматически сброшена для всех узлов.
            </div>
            <div>Количество узлов: 10</div>
          </DialogDescription>
        }
        isOpen={isDeleteServiceZoneDialogOpen}
        onCancel={() => handleDeleteServiceZone(null)}
        onSubmit={() => {
          handleDeleteServiceZone(null);
          deletingServiceZone &&
            handleFinallyDeleteServiceZone(deletingServiceZone.id);
        }}
        submitText="Удалить"
        cancelText="Отмена"
        type="danger"
      />
    </>
  );
};
