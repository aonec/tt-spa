import React, { useContext } from "react";
import _ from "lodash";
import { DeviceContext } from "../DeviceProfile";
import { DEFAULT_BUILDING, DEFAULT_DEVICE } from "./Templates";
import { Loader } from "../../../components";
import { convertDateDots } from "../../../_api/utils/convertDate";
import { ListWrap, ListItem, Title } from "../../../_components/List";

export const Information = (loading = true) => {
  const { device, building, loadings, error } = useContext(DeviceContext);

  const loadingDevice = _.get(loadings, "device", true);
  const loadingBuilding = _.get(loadings, "building", true);

  loading = loadingDevice || loadingBuilding;

  const { city, street, housingStockNumber, corpus } =
    building || DEFAULT_BUILDING;
  const { lastCommercialAccountingDate, futureCheckingDate, lastCheckingDate } =
    device || DEFAULT_DEVICE;

  const errorOfComponent = _.get(error, "resource", null);

  if (errorOfComponent) {
    return (
      <ListWrap>
        <Title>{error.message}</Title>
      </ListWrap>
    );
  }

  return (
    <ListWrap>
      <Loader show={loading} size="32">
        <Title>Информация</Title>
        <ListItem>
          <span>Адрес</span>
          <span style={{ fontWeight: "500" }}>
            {`${city}, ${street}, ${housingStockNumber}${
              corpus ? `, к.${corpus}` : ""
            }`}
          </span>
        </ListItem>
        <ListItem>
          <span>Дата ввода в эксплуатацию</span>
          <span>{convertDateDots(lastCommercialAccountingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата поверки прибора</span>
          <span>{convertDateDots(lastCheckingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDateDots(futureCheckingDate)}</span>
        </ListItem>
      </Loader>
    </ListWrap>
  );
};

export default Information;
