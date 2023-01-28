import { form } from '01/features/reports/CreateReportModal/models';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Checkbox } from 'antd';
import { useForm } from 'effector-forms/dist';
import { EClosingReason } from 'myApi';
import React, { FC, useEffect } from 'react';
import { TreeSelectSC } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { RangeDatePicker } from '../../../view/RangeDatePicker';
import { ResourceSelect } from '../../../view/ResourceSelect';
import { UnloadingType } from '../../closedIndividualDevicesFormService.types';
import { ExportTypeSelectWrapper } from './ClosedIndividualDevicesForm.styled';
import { ClosedIndividualDevicesFormProps } from './ClosedIndividualDevicesForm.types';
import {
  closingReasonsDictionary,
  unloadingTypesDictionary,
  unloadingTypesForLabelDictionary,
} from './ClosedIndividualDevicesFormService.constants';

export const ClosedIndividualDevicesForm: FC<ClosedIndividualDevicesFormProps> = ({
  unloadSelectType,
  setUnloadSelectType,
  preparedAddresses,
  organizationPagedList,
  houseManagementList,
}) => {
  const {
    fields: {
      rangePeriod: { value: rangePeriod, onChange: changeRangePeriod },
      resources: { value: resources, onChange: handleChangeResources },
      closingReasons: {
        value: closingReasons,
        onChange: handleChangeClosingReasons,
      },
      managementFirmId: {
        value: managementFirmId,
        onChange: handleChangeManagementFirmId,
      },
      houseManagementId: {
        value: houseManagementId,
        onChange: handleChangeHouseManagementId,
      },
      housingStockId: {
        value: housingStockId,
        onChange: handleChangeHousingStockId,
      },
      isWithoutApartments: {
        value: isWithoutApartments,
        onChange: handleChangeWithoutApartments,
      },
    },
  } = useForm(form);

  return (
    <div>
      <ExportTypeSelectWrapper>
        <FormItem label="Тип выгрузки">
          <Select
            placeholder="Выберите из списка"
            value={unloadSelectType || undefined}
            onChange={(value) => setUnloadSelectType(value as UnloadingType)}
          >
            {Object.entries(unloadingTypesDictionary).map(([key, elem]) => (
              <Select.Option value={key} key={key}>
                {elem}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        {unloadSelectType === UnloadingType.ByAddress && (
          <FormItem label={unloadingTypesForLabelDictionary[unloadSelectType]}>
            <TreeSelectSC
              placeholder="Выберите из списка"
              showSearch
              showArrow
              treeCheckable={false}
              treeData={preparedAddresses}
              value={housingStockId || undefined}
              onChange={(value) => handleChangeHousingStockId(value as number)}
            />
          </FormItem>
        )}
        {unloadSelectType === UnloadingType.AllManagingFirm && (
          <FormItem label={unloadingTypesForLabelDictionary[unloadSelectType]}>
            <Select
              placeholder="Выберите из списка"
              value={managementFirmId || undefined}
              onChange={(value) =>
                handleChangeManagementFirmId(value as number)
              }
            >
              {organizationPagedList?.items &&
                organizationPagedList?.items.map((e) => (
                  <Select.Option value={e.id} key={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
            </Select>
          </FormItem>
        )}
        {unloadSelectType === UnloadingType.ByHouseManagement && (
          <FormItem label={unloadingTypesForLabelDictionary[unloadSelectType]}>
            <Select
              placeholder="Выберите из списка"
              value={houseManagementId || undefined}
              onChange={(value) =>
                handleChangeHouseManagementId(value as string)
              }
            >
              {houseManagementList?.map((e) => (
                <Select.Option value={e.id} key={e.id}>
                  {e.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        )}
      </ExportTypeSelectWrapper>

      <ResourceSelect
        resources={resources}
        onChange={(value) => handleChangeResources(value)}
      />

      <FormItem label="Причина закрытия">
        <Select
          mode="multiple"
          placeholder="Выберите из спика"
          value={closingReasons}
          onChange={(value) =>
            handleChangeClosingReasons(value as EClosingReason[])
          }
        >
          {Object.entries(closingReasonsDictionary).map(([key, elem]) => (
            <Select.Option value={key} key={key}>
              {elem}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <RangeDatePicker
        label="Период закрытия"
        rangePeriod={rangePeriod}
        onChange={changeRangePeriod}
      />

      <SpaceLine />

      <Checkbox
        checked={isWithoutApartments}
        onChange={(event) =>
          handleChangeWithoutApartments(event.target.checked)
        }
      >
        Исключить квартиры с открытыми ИПУ по выбранному ресурсу
      </Checkbox>
    </div>
  );
};
