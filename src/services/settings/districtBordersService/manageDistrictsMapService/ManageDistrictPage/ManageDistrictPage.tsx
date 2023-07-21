import React, { FC, useMemo } from 'react';
import { useForm } from 'effector-forms';
import { DistrictColorsList } from 'dictionaries';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Button } from 'ui-kit/Button';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { Select } from 'ui-kit/Select';
import { manageDistrictsMapService } from '../manageDistrictsMapService.models';
import { ColorCircle } from '../../createDistrictBorderMapService/view/CreateDistrictBorderMapPage/CreateDistrictFormPanel/CreateDistrictFormPanel.styled';
import {
  ControlButtonsWrapper,
  DistrictSelectWrapper,
  Header,
  MapWrapper,
  SelectColorOptionWrapper,
} from './ManageDistrictPage.styled';
import { Props } from './ManageDistrictPage.types';

const { forms } = manageDistrictsMapService;

export const ManageDistrictPage: FC<Props> = ({
  existingDistricts,
  handleDeleteDistrict,
  organizationCoordinates,
}) => {
  const { fields } = useForm(forms.manageDistrictsForm);

  const { map, mapRef } = useYMaps(organizationCoordinates);

  const setSelectedDistrictId = fields.selectedDistrictId.onChange;

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts).map((elem) => ({
      ...elem,
      onClick: () => setSelectedDistrictId(elem.id),
    }));
  }, [existingDistricts, setSelectedDistrictId]);

  const mapDistricts = useMemo(() => {
    if (!fields.selectedDistrictId.value) {
      return preparedExistingDistricts;
    }

    return preparedExistingDistricts.filter(
      (elem) => elem.id === fields.selectedDistrictId.value,
    );
  }, [preparedExistingDistricts, fields.selectedDistrictId.value]);

  useRenderDistricts(map, mapDistricts);

  return (
    <div>
      <Header>
        <div>
          <GoBack />
        </div>
        <DistrictSelectWrapper>
          <Select
            placeholder="Выберите район"
            small
            value={fields.selectedDistrictId.value || undefined}
            onChange={(value) =>
              fields.selectedDistrictId.onChange((value as string) || null)
            }
            allowClear
          >
            {preparedExistingDistricts.map(({ id, name, type }) => {
              const colorPayload = DistrictColorsList.find(
                (elem) => elem.type === type,
              );
              return (
                <Select.Option key={id} value={id}>
                  <SelectColorOptionWrapper>
                    {colorPayload && (
                      <ColorCircle
                        color={colorPayload.color}
                        strokeColor={colorPayload.strokeColor}
                      />
                    )}
                    <div>{name}</div>
                  </SelectColorOptionWrapper>
                </Select.Option>
              );
            })}
          </Select>
        </DistrictSelectWrapper>
        <ControlButtonsWrapper>
          {fields.selectedDistrictId.value && (
            <Button
              onClick={() => fields.selectedDistrictId.onChange(null)}
              type="ghost"
              size="small"
            >
              Отмена
            </Button>
          )}
          <Button
            disabled={!fields.selectedDistrictId.value}
            type="danger"
            size="small"
            onClick={() => handleDeleteDistrict()}
          >
            Удалить
          </Button>
        </ControlButtonsWrapper>
      </Header>
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </div>
  );
};
