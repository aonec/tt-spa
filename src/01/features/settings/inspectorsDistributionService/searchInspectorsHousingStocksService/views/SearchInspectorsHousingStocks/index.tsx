import { Form, Select } from "antd";
import React, { FC } from "react";
import { ExtendedSearch } from "../../../../../../shared/ui/ExtendedSearch";
import {
  InputSC,
  SelectSC,
  StyledAutocomplete,
} from "../../../../../../shared/ui/Fields";
import { Grid } from "../../../../../../shared/ui/Layout/Grid";
import { useAutocomplete } from "../../../../../../_pages/MetersPage/hooks/useFilter";
import { fromEnter } from "../../../../../housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter";
import { useOnEnterSwitch } from "../../../../../readings/accountingNodesReadings/components/Filter";
import { ExtendedSearchWrap, Wrap } from "./components";
import { SearchInspectorsHousingStocksProps } from "./types";

export const SearchInspectorsHousingStocks: FC<
  SearchInspectorsHousingStocksProps
> = ({
  form,
  cities,
  existingStreets,
  isExtendedSearchOpen,
  handelExtendedSearchOpen,
  handleExtendedSearchClose,
  inspectors,
  hosuingManagements,
  handleSearch,
  handleApplyFilters,
  handleClearExtendedSearchValues,
}) => {
  const street = form.fields.Street.value;

  const { match: streetMatch, options } = useAutocomplete(
    street,
    existingStreets
  );

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef],
  } = useOnEnterSwitch(3);

  const fieldsArray = [
    form.fields.City,
    form.fields.Street,
    form.fields.HousingStockNumber,
  ];

  function clearValuesOnFocus(index: number) {
    const subFieldsArray = fieldsArray.slice(index, fieldsArray.length);

    subFieldsArray.forEach((field) => field.onChange(""));
  }

  return (
    <>
      <Wrap>
        <ExtendedSearch
          isOpen={isExtendedSearchOpen}
          handleClose={handleExtendedSearchClose}
          handleOpen={handelExtendedSearchOpen}
          handleApply={handleApplyFilters}
          handleClear={handleClearExtendedSearchValues}
          extendedSearchContent={
            <ExtendedSearchWrap>
              <Form.Item label="Инспектор">
                <SelectSC
                  placeholder="Выберите из списка"
                  value={form.fields.InspectorId.value || undefined}
                  onChange={(value) => {
                    if (!value) {
                      form.fields.InspectorId.reset();
                    } else {
                      form.fields.InspectorId.onChange(value);
                    }
                  }}
                  allowClear
                >
                  {inspectors?.map((inspector) => (
                    <Select.Option key={inspector.id} value={inspector.id}>
                      {inspector.fullName}
                    </Select.Option>
                  ))}
                </SelectSC>
              </Form.Item>
              <Form.Item label="Домоуправление">
                <SelectSC
                  value={form.fields.HouseManagement.value || undefined}
                  onChange={(value) => {
                    if (!value) {
                      form.fields.HouseManagement.reset();
                    } else {
                      form.fields.HouseManagement.onChange(value);
                    }
                  }}
                  allowClear
                  placeholder="Выберите из списка"
                >
                  {hosuingManagements?.map((houseManagement) => (
                    <Select.Option
                      key={houseManagement.key}
                      value={houseManagement.value!}
                    >
                      {houseManagement.value}
                    </Select.Option>
                  ))}
                </SelectSC>
              </Form.Item>
            </ExtendedSearchWrap>
          }
        >
          <Grid temp="0.5fr 1fr 0.25fr" gap="15px" style={{ width: "100%" }}>
            <SelectSC
              onKeyDown={(e) => {
                keyDownEnterGuardedHandler(0)(e);
                fromEnter(handleSearch)(e);
              }}
              ref={cityRef}
              placeholder="Город"
              value={form.fields.City.value || undefined}
              onChange={form.fields.City.onChange}
              onFocus={() => clearValuesOnFocus(0)}
            >
              {cities &&
                cities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
            </SelectSC>
            <StyledAutocomplete
              ref={streetRef}
              value={form.fields.Street.value}
              onChange={form.fields.Street.onChange}
              onKeyDown={(e) => {
                fromEnter(() =>
                  form.fields.Street.onChange(
                    form.fields.Street.value ? streetMatch : ""
                  )
                )(e);
                keyDownEnterGuardedHandler(1)(e);
                fromEnter(handleSearch)(e);
              }}
              onFocus={() => clearValuesOnFocus(1)}
              options={options}
              placeholder="Улица"
            />
            <InputSC
              ref={homeNumberRef}
              placeholder="Дом"
              value={form.fields.HousingStockNumber.value}
              onChange={(e) =>
                form.fields.HousingStockNumber.onChange(e.target.value)
              }
              onFocus={() => clearValuesOnFocus(2)}
              onKeyDown={(e) => {
                keyDownEnterGuardedHandler(2)(e);
                fromEnter(handleSearch)(e);
              }}
            />
          </Grid>
        </ExtendedSearch>
      </Wrap>
    </>
  );
};
