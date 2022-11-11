import { closingReasons } from '01/features/individualDevices/switchIndividualDevice/components/stages/BaseInfoStage';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Checkbox } from 'antd';
import React, { FC, useState } from 'react';
import { TreeSelectSC } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { RangeDatePicker } from '../../../view/RangeDatePicker';
import { ResourceSelect } from '../../../view/ResourceSelect';
import { UnloadingType } from '../../closedIndividualDevicesFormService.types';
import { ExportTypeSelectWrapper } from './ClosedIndividualDevicesForm.styled';
import { ClosedIndividualDevicesFormProps } from './ClosedIndividualDevicesForm.types';
import {
  unloadingTypesDictionary,
  unloadingTypesForLabelDictionary,
} from './ClosedIndividualDevicesFormService.constants';

export const ClosedIndividualDevicesForm: FC<ClosedIndividualDevicesFormProps> = ({
  unloadSelectType,
  setUnloadSelectType,
  preparedAddresses,
  organizationPagedList,
  houseManagementList
}) => {
  console.log(unloadSelectType);
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
        {unloadSelectType === 'ByAddress' && (
          <FormItem label={unloadingTypesForLabelDictionary[unloadSelectType]}>
            <TreeSelectSC
              placeholder="Выберите из списка"
              showSearch
              showArrow
              treeCheckable={false}
              treeData={preparedAddresses}
            />
          </FormItem>
        )}
        {unloadSelectType === 'AllManagingFirm' && (
          <FormItem label={unloadingTypesForLabelDictionary[unloadSelectType]}>
            <Select
              placeholder="Выберите из списка"
              // value={ }
              // onChange={(value) => setUnloadSelectType(value as UnloadingType)}
            >
              {organizationPagedList?.items &&
                organizationPagedList?.items.map((e) => (
                  <Select.Option value={e.name!} key={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
            </Select>
          </FormItem>
        )}
        {unloadSelectType === 'ByHouseManagement' && (
          <FormItem label={unloadingTypesForLabelDictionary[unloadSelectType]}>
            <Select
              placeholder="Выберите из списка"
              // value={ }
              // onChange={(value) => setUnloadSelectType(value as UnloadingType)}
            >
              {
                houseManagementList?.map((e) => (
                  <Select.Option value={e.name!} key={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
            </Select>
          </FormItem>
        )}
      </ExportTypeSelectWrapper>

      <ResourceSelect onChange={() => {}} resources={[]}></ResourceSelect>

      <FormItem label="Причина закрытия">
        <Select mode="multiple" placeholder="Выберите из спика">
          {Object.entries(closingReasons).map(([key, elem]) => (
            <Select.Option value={key} key={key}>
              {elem}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <RangeDatePicker
        label="Период закрытия"
        rangePeriod={[null, null]}
        onChange={() => {}}
      />

      <SpaceLine />

      <Checkbox>
        {'Исключить квартиры с открытыми ИПУ по выбранному адресу'}
      </Checkbox>
    </div>
  );
};
