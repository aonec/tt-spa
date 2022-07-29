import React, { FC } from "react";
import { ExtendedSearch } from "../../../../../01/shared/ui/ExtendedSearch";
import { AddressSearchContainer } from "../../../../addressSearchService";
import { SearchFieldType } from "../../../../addressSearchService/view/AddressSearch/AddressSearch.types";
import { Wrapper } from "./ApartmentsSearch.styled";
import { ApartmentsSearchProps } from "./ApartmentsSearch.types";

const fields = [
  SearchFieldType.City,
  SearchFieldType.Street,
  SearchFieldType.House,
  SearchFieldType.Corpus,
  SearchFieldType.Apartment,
];

export const ApartmentsSearch: FC<ApartmentsSearchProps> = ({
  handleSearch,
}) => {
  return (
    <Wrapper>
      <ExtendedSearch
        isOpen={false}
        handleApply={() => {}}
        handleClear={() => {}}
        handleClose={() => {}}
        handleOpen={() => {}}
        extendedSearchContent={<></>}
        disabled
      >
        <AddressSearchContainer fields={fields} handleSubmit={handleSearch} />
      </ExtendedSearch>
    </Wrapper>
  );
};
