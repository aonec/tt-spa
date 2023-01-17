import React, { FC } from 'react';
import { ContractorsProps } from './Contractors.types';
import { ContractorItem } from './ContractorItem';
import { companyProfileService } from 'services/company/companyProfileService/companyProfileService.model';
import { LoaderWrapper } from '../../CompanyProfile.styled';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { AddContractorContainer } from 'services/contractors/addContractorService';
import { DeleteContractorContainer } from 'services/contractors/deleteContractorService';
import { EditContractorContainer } from 'services/contractors/editContractorService';

const { gates } = companyProfileService;
const { FetchingContractorsGate } = gates;

export const Contractors: FC<ContractorsProps> = ({
  conractorsList,
  isLoadingContractors,
  catchContractorId,
  handleOpenEditContractorModal,
  catchContractorData,
}) => {
  return (
    <>
      <FetchingContractorsGate />
      <LoaderWrapper>
        <WithLoader isLoading={isLoadingContractors} />
      </LoaderWrapper>

      {!isLoadingContractors &&
        conractorsList?.items &&
        conractorsList.items.map((contractor) => (
          <ContractorItem
            contractor={contractor}
            catchContractorId={catchContractorId}
            handleOpenEditContractorModal={handleOpenEditContractorModal}
            catchContractorData={catchContractorData}
          />
        ))}

      <AddContractorContainer />
      <DeleteContractorContainer />
      <EditContractorContainer />
    </>
  );
};
