import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import { groupBy, sortBy } from 'lodash';
import {  useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import {
  AddressHousesCount,
  AddressNumber,
  AddressNumbersList,
  AddressWrapper,
  ColorCircle,
  DistrictAddressesList,
  DistrictListItem,
  DistrictListItemHeader,
  DistrictListItemInfo,
  Line,
  StreetWrapper,
  Wrapper,
} from './ManageDistrictsList.styled';
import { Props } from './ManageDistrictsList.types';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { getDistrictColor } from 'utils/getDistrictColor';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { DeleteDistrictModal } from '../ManageDistrictsMap/DeleteDistrictModal';
import { EditDistrictInfoModal } from '../ManageDistrictsMap/EditDistrictInfoModal';
import {
  deleteDistrictMutation,
  updateDistrictMutation,
} from '../../manageDistrictsMapService.api';
import { manageDistrictMapService } from '../ManageDistrictsMap/ManageDistricsMap.model';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { AddHouseToDistrictContainer } from './addHouseToDistrict';
import { addHouseToDistrictService } from './addHouseToDistrict/addHouseToDistrictService.models';
import {
  DeleteHouseInDistrictContainer,
  deleteHouseInDistrictService,
} from './deleteHouseInDistrict';

const { outputs, inputs } = manageDistrictMapService;

export const ManageDistrictsList: FC<Props> = ({
  existingDistricts,
  isDistrictLoading,
}) => {
  const {
    selectedDistrictId,
    isDeleteDistrictModalOpen,
    isEditDistictInfoModalOpen,
    selectDistrict,
    openDeleteDistrictModal,
    closeDeleteDistrictModal,
    openEditDistrictModal,
    closeEditDistrictModal,
    openAddHouseModal,
    setDeletePayloadData,
  } = useUnit({
    selectedDistrictId: outputs.$selectedDistrict,
    isDeleteDistrictModalOpen: outputs.$isDeleteDistrictModalOpen,
    isEditDistictInfoModalOpen: outputs.$isEditDistictInfoModalOpen,
    selectDistrict: inputs.selectDistrict,
    openDeleteDistrictModal: inputs.openDeleteDistrictModal,
    closeDeleteDistrictModal: inputs.closeDeleteDistrictModal,
    openEditDistrictModal: inputs.openEditDistrictModal,
    closeEditDistrictModal: inputs.closeEditDistrictModal,
    openAddHouseModal: addHouseToDistrictService.inputs.openAddHouseModal,
    setDeletePayloadData:
      deleteHouseInDistrictService.inputs.setDeletePayloadData,
  });

  const { start: deleteDistrict, pending: isDeletingDistrictLoading } = useUnit(
    deleteDistrictMutation,
  );

  const { start: updateDistrict, pending: isUpdateDistrictLoading } = useUnit(
    updateDistrictMutation,
  );

  const navigate =  useNavigate();

  const [openedDistrict, setOpenedDistrict] = useState<string | null>(null);
  const [openedStreets, setOpenedStreets] = useState<string[]>([]);

  const clickStreet = useCallback((street: string) => {
    setOpenedStreets((prev) =>
      prev?.includes(street)
        ? prev.filter((elem) => elem !== street)
        : [...prev, street],
    );
  }, []);

  useEffect(() => {
    setOpenedStreets([]);
  }, [openedDistrict, setOpenedStreets]);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts);
  }, [existingDistricts]);

  const selectedPreparedDistrict = useMemo(() => {
    if (!selectedDistrictId) return null;

    return (
      preparedExistingDistricts.find(({ id }) => id === selectedDistrictId) ||
      null
    );
  }, [selectedDistrictId, preparedExistingDistricts]);

  return (
    <>
      <AddHouseToDistrictContainer districtsList={preparedExistingDistricts} />
      <DeleteHouseInDistrictContainer />

      <WithLoader isLoading={isDistrictLoading}>
        {isDeleteDistrictModalOpen && selectedPreparedDistrict && (
          <DeleteDistrictModal
            closeDeleteDistrictModal={closeDeleteDistrictModal}
            districtName={selectedPreparedDistrict.name}
            handleDeleteDistrict={() =>
              selectedPreparedDistrict.id &&
              deleteDistrict(selectedPreparedDistrict.id)
            }
            isLoading={isDeletingDistrictLoading}
          />
        )}
        {isEditDistictInfoModalOpen && selectedPreparedDistrict && (
          <EditDistrictInfoModal
            updateDistrict={updateDistrict}
            closeEditDistrictModal={closeEditDistrictModal}
            districtData={selectedPreparedDistrict}
            isLoading={isUpdateDistrictLoading}
          />
        )}
        <Wrapper>
          {preparedExistingDistricts.map((elem) => {
            const color = getDistrictColor(elem.type);

            const districtId = elem.id;

            const groupedAddresses = groupBy(elem.houses || [], (house) => {
              const arr = house.address?.split(' ');

              return arr?.slice(1, arr.length - 2).join(' ');
            });

            return (
              <DistrictListItem key={elem.id}>
                <DistrictListItemHeader
                  onClick={() =>
                    setOpenedDistrict((prev) =>
                      prev === elem.id ? null : elem.id,
                    )
                  }
                >
                  <DistrictListItemInfo>
                    {color && (
                      <ColorCircle
                        strokeColor={color.strokeColor}
                        fillColor={color.color}
                      />
                    )}
                    {`${elem.name} (${elem.houses?.length})`}
                  </DistrictListItemInfo>
                  <ContextMenuButton
                    size="small"
                    menuButtons={[
                      {
                        title: 'Добавить дом',
                        onClick: () => openAddHouseModal(elem),
                      },
                      {
                        title: 'Редактировать название и цвет района',
                        onClick: () => {
                          selectDistrict(elem.id);
                          openEditDistrictModal();
                        },
                      },
                      {
                        title: 'Изменить границы района на карте',
                        onClick: () => {
                           navigate(
                            `/districtBordersSettings/editDistrictBorders/${elem.id}`,
                          );
                        },
                      },
                      {
                        title: 'Удалить район',
                        color: ContextMenuButtonColor.danger,
                        onClick: () => {
                          selectDistrict(elem.id);
                          openDeleteDistrictModal();
                        },
                      },
                    ]}
                  />
                </DistrictListItemHeader>
                {openedDistrict === elem.id && Boolean(elem.houses?.length) && (
                  <DistrictAddressesList>
                    {Object.entries(groupedAddresses).map(([key, value]) => {
                      const isOpen = openedStreets.includes(key);

                      return (
                        <React.Fragment key={key}>
                          <AddressWrapper onClick={() => clickStreet(key)}>
                            <StreetWrapper isOpen={isOpen}>{key}</StreetWrapper>
                            <AddressHousesCount>
                              {value.length} объектов
                              <ChevronDown />
                            </AddressHousesCount>
                          </AddressWrapper>
                          {isOpen && (
                            <AddressNumbersList>
                              {sortBy(value, (elem) => elem.address).map(
                                (elem) => {
                                  const arr = elem.address?.split(' ');
                                  const number = arr && arr[arr?.length - 2];

                                  const buildingId = elem.id;

                                  return (
                                    <>
                                      <ContextMenuButton
                                        menuButtons={[
                                          {
                                            title: 'Удалить дом',
                                            color:
                                              ContextMenuButtonColor.danger,
                                            onClick: () => {
                                              buildingId &&
                                                setDeletePayloadData({
                                                  districtId,
                                                  buildingId,
                                                });
                                            },
                                          },
                                        ]}
                                      >
                                        {(isOpen) => (
                                          <AddressNumber isOpen={isOpen}>
                                            {number}
                                          </AddressNumber>
                                        )}
                                      </ContextMenuButton>
                                    </>
                                  );
                                },
                              )}
                            </AddressNumbersList>
                          )}
                          <Line />
                        </React.Fragment>
                      );
                    })}
                  </DistrictAddressesList>
                )}
              </DistrictListItem>
            );
          })}
        </Wrapper>
      </WithLoader>
    </>
  );
};
