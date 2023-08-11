import { form } from 'services/reports/CreateReportModal/models';
import { SpaceLine } from 'ui-kit/SpaceLine';
import { Checkbox } from 'antd';
import { useForm } from 'effector-forms';
import { EClosingReason } from 'api/types';
import React, { FC } from 'react';
import { TreeSelectSC } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { RangeDatePicker } from '../../../view/RangeDatePicker';
import { ResourceSelect } from '../../../view/ResourceSelect';
import { UnloadingType } from '../../closedIndividualDevicesFormService.types';
import {
  CitySelectWrapper,
  ExportTypeSelectWrapper,
} from './ClosedIndividualDevicesForm.styled';
import { ClosedIndividualDevicesFormProps } from './ClosedIndividualDevicesForm.types';
import {
  closingReasonsDictionary,
  unloadingTypesDictionary,
  unloadingTypesForLabelDictionary,
} from './ClosedIndividualDevicesFormService.constants';
import { SelectMultiple } from 'ui-kit/SelectMultiple';

export const ClosedIndividualDevicesForm: FC<
  ClosedIndividualDevicesFormProps
> = ({
  unloadSelectType,
  setUnloadSelectType,
  preparedAddresses,
  organizationPagedList,
  houseManagementList,
  existingCities,
  selectCity,
  selectedCity,
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

  const isCityShow =
    existingCities.length > 1 && unloadSelectType === UnloadingType.ByAddress;

  return (
    <div>
      <ExportTypeSelectWrapper>
        <CitySelectWrapper showCity={isCityShow}>
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

          {isCityShow && (
            <FormItem label="Город">
              <Select
                placeholder="Выберите из списка"
                onChange={(type) => selectCity(String(type))}
                value={selectedCity || undefined}
              >
                {existingCities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          )}
        </CitySelectWrapper>

        {unloadSelectType === UnloadingType.ByAddress && (
          <FormItem label={unloadingTypesForLabelDictionary[unloadSelectType]}>
            <TreeSelectSC
              placeholder="Выберите из списка"
              showSearch
              showArrow
              treeData={preparedAddresses}
              value={housingStockId || undefined}
              onChange={(value) => handleChangeHousingStockId(value as number)}
              treeCheckable={false}
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
        <SelectMultiple
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
        </SelectMultiple>
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
