## Code requirements

### Наименование веток и коммитов

1. Наименование веток - `R2-1318-add-incpectors-to-object`
2. Наименование коммитов `[R2-1318]: add modal to main page`

# Правила создания сервисов

1. новый сервис добавляется в папку features
2. если он связан с некой центральной сущностью, то добавляем в папку этой сущности

- nodesService
  - displayNodeService
  - displayNodesListService
  - editNodeService
    - editNodeService.models.ts
    - editNodeService.conainer.ts
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
import { createDomain, sample } from 'effector';
import { IndividualDeviceListItemResponse } from 'api/types';
import { deleteDevice } from './deleteIndividualDeviceService.api';

const domain = createDomain('deleteIndividualDeviceService');

const $currentIndividualDevice =
  domain.createStore<IndividualDeviceListItemResponse | null>(null);

const $isModalOpen = $currentIndividualDevice.map(Boolean);

const deleteDeviceModalOpened =
  domain.createEvent<IndividualDeviceListItemResponse>();
const deleteDeviceModalClosed = domain.createEvent();

const acceptDeleteDevice = domain.createEvent();

const deleteIndividualDeviceFx = domain.createEffect<number, void>(
  deleteDevice,
);

const deletingComplete = deleteIndividualDeviceFx.doneData;

$currentIndividualDevice
  .on(deleteDeviceModalOpened, (_, device) => device)
  .reset(deleteDeviceModalClosed, deleteIndividualDeviceFx.doneData);

sample({
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
    deleteIndividualDeviceService.outputs.$currentIndividualDevice,
  );
  const loading = useStore(deleteIndividualDeviceService.outputs.$loading);

  const handleClose = useEvent(
    deleteIndividualDeviceService.inputs.deleteDeviceModalClosed,
  );
  const handleDelete = useEvent(
    deleteIndividualDeviceService.inputs.acceptDeleteDevice,
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

## Использование ttcodegen

### документация: [ttcodegen](https://www.npmjs.com/package/@pronix/ttcodegen)

### Установка:

```cmd
yarn global add @pronix/ttcodegen
```

## Правила оставления коментариев в коде:

Коментарии на русском языке.
Если нужно оставить метку в коде о том что будет дорабатыватся, то комент дожн выглядить так:
// todo: kek-kek
Например: // todo: регулярная выгрузка

## Правила загрузки документов:

Следует использовать компонент **DocumentsUploadContainer** .
Он принимает props **_type_**, обязательный для парсинга на бэке.
Тип назначает согласно **enum EDocumentType** .
Типы можно получить: GET /api/Documents/types

Дикшинари:

    {
        "key": "Common",
        "value": "Прочее"
    },
    {
        "key": "DeviceCommissionCheckAct",
        "value": "Акт комиссионной проверки прибора"
    },
    {
        "key": "DeviceCheckAct",
        "value": "Акт проверки прибора"
    },
    {
        "key": "DeviceCommercialAccountingAct",
        "value": "Акт постановки прибора на коммерческий учет"
    },
    {
        "key": "DeviceAcceptanceAct",
        "value": "Акт выполненных работ"
    },
    {
        "key": "DeviceDeploymentAct",
        "value": "Акт установки прибора"
    },
    {
        "key": "DeviceClosingAct",
        "value": "Акт снятия прибора"
    },
    {
        "key": "DevicePassport",
        "value": "Паспорт прибора"
    },
    {
        "key": "DeviceTestCertificates",
        "value": "Свидетельство о поверке прибора"
    },
    {
        "key": "ApartmentCheckingAct",
        "value": "Акт проверки на квартире"
    },
    {
        "key": "ApartmentAccessDeniedAct",
        "value": "Акт недопуска в квартиру"
    },
    {
        "key": "ApartmentUnauthorizedInterferenceAct",
        "value": "Акт несанкционированного вмешательства в ИПУ"
    },
    {
        "key": "AdditionalMaterials",
        "value": "Дополнительные материалы"
    },
    {
        "key": "HeatingSeasonStartingOrder",
        "value": "Приказ о начале отопительного сезона"
    },
    {
        "key": "HeatingSeasonEndingOrder",
        "value": "Приказ о завершении отопительного сезона"
    },
    {
        "key": "HeatingSeasonChangingStatement",
        "value": "Заявление об изменении отопительного сезона"
    },
    {
        "key": "Photo",
        "value": "Фотография"
    },
    {
        "key": "NodeAdmissionAct",
        "value": "Aкт допуска"
    },
    {
        "key": "ImportedFile",
        "value": "Импортированный файл"
    },
    {
        "key": "ProfilePhoto",
        "value": "Фотография в профиле пользователя"
    },
    {
        "key": "ApartmentStoppingStatement",
        "value": "Заявление от абонента о постановке квартиры на паузу"
    }
