import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Alert, Form } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  InputTT,
  SelectTT,
  DatePickerTT,
  ButtonTT,
  StyledFooter,
  IconTT,
  styles,
  StyledFormPage,
} from '../../../tt-components';
import { nodeStatusList, resources } from '../../../tt-components/localBases';
import {
  DocumentResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from '../../../../myApi';
import moment from 'moment';
import { EditNodeContext } from '../Context';
import { putNode } from '../../../_api/apiRequests';
import { addServiceZoneButtonClicked } from '../../../features/serviceZones/addServiceZone/models';
import AddNewZonesModal from '../../../features/serviceZones/addServiceZone';
import {
  $derivedChosenInput,
  $requestServiceZonesStatus,
  $serviceZones,
  setChosenInput,
} from '../../../features/serviceZones/selectServiceZones/models';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { Loader } from '../../../components/Loader';
import { DocumentsUpload } from './DocumentsUpload';
import { FilesList } from '01/shared/ui/FilesList';
import { FileData } from '01/hooks/useFilesUpload';
import { postNodeDocuments } from '01/_api/editNode';
import { deleteDoc } from '01/_api/task_profile_page';
import _ from 'lodash';
import { EditNodeCalculatorConnectionContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/EditNodeCalculatorConnectionContainer';

interface EditNodeFormInterface {
  // calculator: CalculatorResponse;
  currentTabKey: string;
  setTab: any;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  setExistCalculator: Dispatch<SetStateAction<boolean>>;
  node: PipeNodeResponse;
  setDeregisterDeviceValue: any;
  setDeregisterDevice: Dispatch<SetStateAction<boolean>>;
}

const EditNodeForm = ({
  // calculator,
  currentTabKey,
  node,
  setDeregisterDevice,
  setDeregisterDeviceValue,
}: EditNodeFormInterface) => {
  const {
    resource,
    number,
    nodeServiceZone,
    nodeStatus,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    id: nodeId,
    calculatorId,
    documents,
  } = node;
  const { setVisibleAddDevice } = useContext(EditNodeContext);
  const serviceZones = useStore($serviceZones);
  const zonesLoadingStatus = useStore($requestServiceZonesStatus);
  const isRequestServiceZonesError = zonesLoadingStatus === 'error';
  const chosenInputForSelect = useStore($derivedChosenInput);

  const [newDocuments, setNewDocuments] = useState<FileData[]>([]);
  const [deletedDocumentIds, setDeletedDocumentIds] = useState<number[]>([]);

  const [pendingSave, setPendingSave] = useState(false);

  if (!node) {
    return null;
  }
  const nodeServiceZoneId = nodeServiceZone?.id;
  const selectZonesOptions = serviceZones.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));

  if (nodeServiceZoneId && !chosenInputForSelect) {
    setChosenInput(nodeServiceZoneId);
  }

  const initialServiceZoneInfo = selectZonesOptions.find(
    (el) => el.value === nodeServiceZoneId
  );
  const { label: initialServiceZoneLabel } = initialServiceZoneInfo || {};

  const [form] = Form.useForm();
  const { getFieldValue, setFieldsValue } = form;

  const renderDocuments =
    ([
      ...(documents || []),
      ..._.map(newDocuments, 'fileResponse'),
    ] as DocumentResponse[]).filter(
      (elem) => !deletedDocumentIds.includes(elem.id)
    ) || [];

  async function saveDocuments() {
    const ids = _.map(renderDocuments, 'id');

    return postNodeDocuments(nodeId, ids);
  }

  function deleteDocs() {
    return Promise.all(deletedDocumentIds.map(deleteDoc));
  }

  const onFinish = async () => {
    const nodeForm: UpdatePipeNodeRequest = {
      number: Number(getFieldValue('number')),
      nodeServiceZoneId: chosenInputForSelect?.value,
      calculatorId,
    };

    setPendingSave(true);

    await Promise.all([
      saveDocuments(),
      deleteDocs(),
      putNode(nodeId, nodeForm),
    ]);

    setPendingSave(false);
  };

  if (zonesLoadingStatus === 'loading' || zonesLoadingStatus === 'init')
    return <Loader show />;

  const initialValues = {
    resource: resource,
    number: number,
    serviceZone: initialServiceZoneLabel,
    nodeStatus: nodeStatus?.value,
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate)
      : null,
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate)
      : null,
  };

  return (
    <>
      {isRequestServiceZonesError ? (
        <Alert
          message="Ошибка"
          description="Не удалось загрузить зоны обслуживания. Пожалуйста, обновите страницу или повторите попытку позже"
          type="error"
          showIcon
          closable
          style={{ marginBottom: 24 }}
        />
      ) : null}

      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        form={form}
        requiredMark={false}
        scrollToFirstError
      >
        <StyledFormPage hidden={Number(currentTabKey) !== 3}>
          <div style={styles.w100}></div>

          <ButtonTT
            type="button"
            color="white"
            small
            onClick={() => {
              if (setVisibleAddDevice) {
                setVisibleAddDevice(true);
              }
            }}
            style={{ marginTop: 24 }}
          >
            Подключить прибор
            <IconTT icon="plus" />
          </ButtonTT>
        </StyledFormPage>
      </Form>
    </>
  );
};

const ButtonLoader = styled(Loader)`
  margin: 2px 6px 0 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export default EditNodeForm;
