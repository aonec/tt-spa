## Code requirements

### Наименование веток и коммитов
1. Наименование веток - `R2-1318-add-incpectors-to-object`
2. Наименование коммитов `[R2-1318]: add modal to main page`

# Правила создания сервсиов
1. новый сервис добавляется в папку features
2. если он связан с некой центральной сущностью, то добавляем в папку этой сущности

- nodesService
  - displayNodeService
  - displayNodesListService
  - editNodeService
    - editNodeService.models.ts
    - editNodeService.conainer.ts
    - editNodeService.relations.ts
    - editNodeService.types.ts
    - editNodeService.container.ts
    - editNodeService.api.ts
    - views 
      - EditNodeForm
        - EditNodeForm.tsx
        - EditNodeForm.styled.ts
        - EditNodeForm.types.ts
      - EditNodeModal.tsx
      - EditNodeModal.types.ts
      - EditNodeModal.styled.ts

### Что такое container
Контейнер связывает локальную модель сервиса с ее view.
Таким образом внутри контейнера может быть использована только локальная модель сервиса.
Если нужны данные с другой модели, то реэкспортим внутри локальной модели.

### deleteIndividualDeviceService.models.ts
Объявляются базовые компоненты сервиса, описывются связи внутри сервиса, экспортится объект модели с полями inputs и outputs 
```ts
import { createDomain, guard } from 'effector';
import { IndividualDeviceListItemResponse } from 'myApi';
import { deleteDevice } from './deleteIndividualDeviceService.api';

const deleteIndividualDeviceDomain = createDomain(
  'deleteIndividualDeviceService'
);

const $currentIndividualDevice = deleteIndividualDeviceDomain.createStore<IndividualDeviceListItemResponse | null>(
  null
);

const $isModalOpen = $currentIndividualDevice.map(Boolean);

const deleteDeviceModalOpened = deleteIndividualDeviceDomain.createEvent<IndividualDeviceListItemResponse>();
const deleteDeviceModalClosed = deleteIndividualDeviceDomain.createEvent();

const acceptDeleteDevice = deleteIndividualDeviceDomain.createEvent();

const deleteIndividualDeviceFx = deleteIndividualDeviceDomain.createEffect<
  number,
  void
>(deleteDevice);

const deletingComplete = deleteIndividualDeviceFx.doneData;

$currentIndividualDevice
  .on(deleteDeviceModalOpened, (_, device) => device)
  .reset(deleteDeviceModalClosed, deleteIndividualDeviceFx.doneData);

guard({
  source: $currentIndividualDevice.map((device) => device?.id),
  clock: acceptDeleteDevice,
  filter: (id): id is number => typeof id === 'number',
  target: deleteIndividualDeviceFx,
});

export const deleteIndividualDeviceService = {
  inputs: {
    deleteDeviceModalOpened,
    deleteDeviceModalClosed,
    acceptDeleteDevice,
    deletingComplete,
  },
  outputs: {
    $isModalOpen,
    $currentIndividualDevice,
    $loading: deleteIndividualDeviceFx.pending,
  },
};
```

### deleteIndividualDeviceService.relations.ts
Описывются связи с внешними сервисами

```ts
import { forward } from 'effector';
import { deleteIndividualDeviceService } from './deleteIndividualDeviceService.models';
import { refetchIndividualDevices } from '../displayIndividualDevices';

forward({
  from: deleteIndividualDeviceService.inputs.deletingComplete,
  to: refetchIndividualDevices,
});
```

### deleteIndividualDeviceService.api.ts
Описываются ассинхранные запросы к апи

```ts
import { axios } from '01/axios';

export const deleteDevice = (id: number): Promise<void> =>
  axios.post(`IndividualDevices/${id}/Delete`);
```

### deleteIndividualDeviceService.container.tsx
Контейнер связывает локальную модель сервиса с ее view
```tsx
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { deleteIndividualDeviceService } from './deleteIndividualDeviceService.models';
import { DeleteIndividualDeviceModal } from './views/DeleteIndividualDeviceModal';

export const DeleteIndividualDeviceModalContainer = () => {
  const visible = useStore(deleteIndividualDeviceService.outputs.$isModalOpen);
  const device = useStore(
    deleteIndividualDeviceService.outputs.$currentIndividualDevice
  );
  const loading = useStore(deleteIndividualDeviceService.outputs.$loading);

  const handleClose = useEvent(
    deleteIndividualDeviceService.inputs.deleteDeviceModalClosed
  );
  const handleDelete = useEvent(
    deleteIndividualDeviceService.inputs.acceptDeleteDevice
  );

  return (
    <DeleteIndividualDeviceModal
      device={device}
      visible={visible}
      loading={loading}
      handleClose={() => handleClose()}
      handleDelete={() => handleDelete()}
    />
  );
};
```
