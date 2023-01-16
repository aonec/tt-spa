import React, { FC } from 'react';
import { ContractorsProps } from './Contractors.types';
import { ContractorItem } from './ContractorItem';
import { companyProfileService } from 'services/company/companyProfileService/companyProfileService.model';
import { LoaderWrapper } from '../../CompanyProfile.styled';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { AddContractorContainer } from 'services/contractors/addContractorService';

const { gates } = companyProfileService;
const { FetchingContractorsGate } = gates;

export const Contractors: FC<ContractorsProps> = ({
  conractorsList,
  fetchContractorsPending,
}) => {
  return (
    <>
      <FetchingContractorsGate />
      <LoaderWrapper>
        <WithLoader isLoading={fetchContractorsPending} />
      </LoaderWrapper>

      {!fetchContractorsPending &&
        conractorsList?.items &&
        conractorsList.items.map((contractor) => (
          <ContractorItem contractor={contractor} />
        ))}

      <AddContractorContainer />
    </>
  );
};
