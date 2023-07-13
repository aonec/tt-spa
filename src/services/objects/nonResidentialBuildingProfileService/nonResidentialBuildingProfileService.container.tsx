import React from 'react';
import { nonResidentialBuildingProfileService } from './nonResidentialBuildingProfileService.model';
import { useParams } from 'react-router-dom';
import { getNonResidentialBuildingQuery } from './nonResidentialBuildingProfileService.api';
import { useUnit } from 'effector-react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { NonResidentialBuildingProfile } from './view/NonResidentialBuildingProfile';

const { inputs, outputs, gates } = nonResidentialBuildingProfileService;
const { BuildingIdGate } = gates;

export const NonResidentialBuildingProfileContainer = () => {
  const { buildingId } = useParams<{ buildingId: string }>();

  const { currentGrouptype, isLoading, nonResidentialBuilding, setGrouptype } =
    useUnit({
      isLoading: getNonResidentialBuildingQuery.$pending,
      nonResidentialBuilding: getNonResidentialBuildingQuery.$data,
      currentGrouptype: outputs.$currentGrouptype,
      setGrouptype: inputs.setCurrentGroutype,
    });

  return (
    <>
      <BuildingIdGate buildingId={Number(buildingId)} />
      <WithLoader isLoading={isLoading}>
        <NonResidentialBuildingProfile
          currentGrouptype={currentGrouptype}
          setGrouptype={setGrouptype}
          nonResidentialBuilding={nonResidentialBuilding}
        />
      </WithLoader>
    </>
  );
};
