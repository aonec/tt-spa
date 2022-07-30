
import { createForm } from 'effector-forms';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { nodeService } from '../../displayNode/models';
import moment from 'moment';
import { nodeChecksService } from '../displayNodeChecks/models';
import { message } from 'antd';
import { CreateNodeCheckRequest, ECheckType, ENodeCheckType } from '../../../../../api/types';
import { axios } from '../../../../../api/axios';
import { FileData } from '../../../../hooks/useFilesUpload';

const checkNodeDomain = createDomain('checkNode');

const $isCheckNodeModalOpen = checkNodeDomain.createStore(false);

const checkNodeFx = checkNodeDomain.createEffect<
  {
    nodeId: number;
    data: CreateNodeCheckRequest;
  },
  void
>();

const createNodeCheckEv = checkNodeDomain.createEvent();

const closeCheckNodeModal = checkNodeDomain.createEvent();
const openCheckNodeModal = checkNodeDomain.createEvent();

const removeNodeCheckFx = checkNodeDomain.createEffect<
  { nodeId: number; checkId: number },
  void
>();

const removeNodeCheckEv = checkNodeDomain.createEvent<number>();

const openEditCheckModal = checkNodeDomain.createEvent();

export interface EditNodeCheckPayload {
  id: number;
  checkingDate: string;
  checkType: ECheckType;
  checkingAct: any;
  registryNumber: string;
}

const $editNodeCheckModalPayload = checkNodeDomain.createStore<EditNodeCheckPayload | null>(
  null
);
const $isEditNodeCheckModalOpen = $editNodeCheckModalPayload.map(Boolean);

const openEditNodeCheckModal = checkNodeDomain.createEvent<EditNodeCheckPayload>();

const editNodeCheckFx = checkNodeDomain.createEffect<
  { data: EditNodeCheckPayload; nodeId: number; nodeCheckId: number },
  void
>();

const clearPayloadFile = checkNodeDomain.createEvent();

const saveEditNodeCheck = checkNodeDomain.createEvent();

const checkNodeForm = createForm({
  fields: {
    checkingDate: {
      init: null as null | string,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    checkType: {
      init: null as null | ENodeCheckType,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    documentIds: {
      init: [] as FileData[],
      rules: [
        {
          name: 'required',
          validator: (arr) => {
            const isEditMode = $isEditNodeCheckModalOpen.getState();

            if (isEditMode) return true;

            return Boolean(arr.length);
          },
        },
      ],
    },
    registryNumber: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    checkingAct: {
      init: null as null | null,
    },
  },
});

export const checkNodeService = {
  inputs: {
    saveEditNodeCheck,
    openEditNodeCheckModal,
    clearPayloadFile,
    openEditCheckModal,
    removeNodeCheckEv,
    createNodeCheckEv,
    closeCheckNodeModal,
    openCheckNodeModal,
  },
  outputs: {
    $isCheckNodeModalOpen,
    $isEditNodeCheckModalOpen,
    $editNodeCheckModalPayload,
    $loading: combine(
      checkNodeFx.pending,
      editNodeCheckFx.pending,
      (...loadings) => loadings.some(Boolean)
    ),
  },
  forms: {
    checkNodeForm,
  },
};

checkNodeFx.use((payload) =>
  axios.post(`Nodes/${payload.nodeId}/Checks`, payload.data)
);
editNodeCheckFx.use((payload) =>
  axios.put(
    `Nodes/${payload.nodeId}/Checks/${payload.nodeCheckId}`,
    payload.data
  )
);
removeNodeCheckFx.use((payload) =>
  axios.delete(`Nodes/${payload.nodeId}/Checks/${payload.checkId}`)
);

checkNodeFx.doneData.watch(() =>
  message.success('Проверка успешно добавлена!')
);
checkNodeFx.failData.watch(() =>
  message.error('Ошибка при добавлении проверки')
);
editNodeCheckFx.doneData.watch(() =>
  message.success('Проверка успешно сохранена!')
);
editNodeCheckFx.failData.watch(() =>
  message.error('Ошибка при сохранении проверки')
);
removeNodeCheckFx.doneData.watch(() =>
  message.success('Проверка успешно удалена!')
);
removeNodeCheckFx.failData.watch(() =>
  message.error('Ошибка при удалении проверки')
);

$isCheckNodeModalOpen
  .on(openCheckNodeModal, () => true)
  .reset(closeCheckNodeModal, checkNodeFx.done);

sample({
  source: combine(
    nodeService.gates.NodeGate.state.map(({ id }) => id),
    checkNodeForm.$values,
    (id, values) => ({
      nodeId: id,
      data: {
        ...values,
        checkingDate: moment(values.checkingDate).format('YYYY-MM-DD'),
        documentId: values.documentIds.map((elem) => elem.fileResponse?.id)[0],
      },
    })
  ),
  clock: guard({
    source: $isCheckNodeModalOpen,
    clock: checkNodeForm.formValidated,
    filter: (isOpen) => isOpen,
  }),
  target: checkNodeFx as any,
});

sample({
  source: combine(
    nodeService.gates.NodeGate.state.map(({ id }) => id),
    $editNodeCheckModalPayload,
    checkNodeForm.$values,
    (nodeId, payload, data) => ({
      nodeId,
      nodeCheckId: payload?.id!,
      data,
    })
  ),
  fn: ({ nodeId, nodeCheckId, data }) => ({
    nodeId,
    nodeCheckId,
    data: {
      ...data,
      documentId: data.documentIds[0]?.fileResponse?.id,
    },
  }),
  clock: guard({
    source: $isEditNodeCheckModalOpen,
    clock: checkNodeForm.formValidated,
    filter: (isOpen) => isOpen,
  }),
  target: editNodeCheckFx as any,
});

forward({
  from: checkNodeFx.done,
  to: [nodeChecksService.inputs.refetchNodeChecks, checkNodeForm.reset],
});

sample({
  source: nodeService.outputs.$node,
  clock: removeNodeCheckEv,
  fn: (node, checkId) => ({ nodeId: node?.id!, checkId }),
  target: removeNodeCheckFx,
});

forward({
  from: removeNodeCheckFx.done,
  to: nodeChecksService.inputs.refetchNodeChecks,
});

$editNodeCheckModalPayload
  .on(openEditNodeCheckModal, (_, payload) => {
    return payload;
  })
  .reset(closeCheckNodeModal)
  .on(clearPayloadFile, (payload) =>
    payload ? { ...payload, checkingAct: null } : null
  );

sample({
  clock: openEditNodeCheckModal,
  fn: (payload) => {
    return {
      ...payload,
      documentIds: payload?.checkingAct
        ? [
            {
              id: Date.now(),
              fileResponse: payload?.checkingAct,
            },
          ]
        : [],
    };
  },
  target: checkNodeForm.setForm as any,
});

forward({
  from: closeCheckNodeModal,
  to: [checkNodeForm.reset],
});

forward({
  from: editNodeCheckFx.doneData,
  to: [closeCheckNodeModal, nodeChecksService.inputs.refetchNodeChecks],
});
