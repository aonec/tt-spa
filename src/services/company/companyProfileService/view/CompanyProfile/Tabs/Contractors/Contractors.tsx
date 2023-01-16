import React, { FC } from 'react';
import { ContractorsProps } from './Contractors.types';
import { ContractorItem } from './ContractorItem';
import { companyProfileService } from 'services/company/companyProfileService/companyProfileService.model';

const { gates } = companyProfileService;
const { FetchingContractorsGate } = gates;

export const Contractors: FC<ContractorsProps> = ({}) => {
  return (
    <>
      <FetchingContractorsGate />
      <ContractorItem />
    </>
  );
};
