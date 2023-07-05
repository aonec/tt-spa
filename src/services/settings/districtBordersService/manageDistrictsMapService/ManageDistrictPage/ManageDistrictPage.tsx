import React, { FC, useMemo, useState } from 'react';
import {
  ControlButtonsWrapper,
  DistrictSelectWrapper,
  Header,
  MapWrapper,
  SelectColorOptionWrapper,
} from './ManageDistrictPage.styled';
import { Props } from './ManageDistrictPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { Select } from 'ui-kit/Select';
import { ColorCircle } from '../../createDistrictBorderMapService/view/CreateDistrictBorderMapPage/CreateDistrictFormPanel/CreateDistrictFormPanel.styled';
import { DistrictColorsList } from 'dictionaries';

export const ManageDistrictPage: FC<Props> = ({ existingDistricts }) => {
  const { map, mapRef } = useYMaps();

  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null,
  );

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts).map((elem) => ({
      ...elem,
      onClick: () => setSelectedDistrictId(elem.id),
    }));
  }, [existingDistricts]);

  const mapDistricts = useMemo(() => {
    if (!selectedDistrictId) {
      return preparedExistingDistricts;
    }

    return preparedExistingDistricts.filter(
      (elem) => elem.id === selectedDistrictId,
    );
  }, [preparedExistingDistricts, selectedDistrictId]);

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
            value={selectedDistrictId || undefined}
            onChange={(value) =>
              setSelectedDistrictId((value as string) || null)
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
          {selectedDistrictId && (
            <Button
              onClick={() => setSelectedDistrictId(null)}
              type="ghost"
              size="small"
            >
              Отмена
            </Button>
          )}
          <Button disabled={!selectedDistrictId} type="danger" size="small">
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
