import React from "react";
import { HeaderWrap } from "../../../tt-components";
import IsActive from "../../../tt-components/IsActive";
import { GoBack } from "../../../../ui-kit/shared_components/GoBack";
import { Flex } from "../../../shared/ui/Layout/Flex";
import { getApartmentFromFullAddress } from "../../../../utils/getApartmentFromFullAddress";
import { Loader } from "../../../_components/Loader";
import { StockIconTT } from "../../Devices/components/DeviceBlock/DeviceBlock";
import DeviceIcons from "../../../_components/DeviceIcons";
import { Subtitle, Title } from "../../../_components/Headers";
import { Space } from "../../../shared/ui/Layout/Space/Space";
import { IndividualDeviceResponse } from "../../../../api/types";

interface HeaderInterface {
  device: IndividualDeviceResponse;
}

export const Header = ({ device }: HeaderInterface) => {
  if (!device) {
    return null;
  }
  const loading = !device;
  const { address, model, serialNumber, resource, closingDate } = device;
  const { id, apartmentId } = address || {};

  return (
    <Loader show={loading} size="32">
      <GoBack />
      <HeaderWrap>
        <div>
          <Title>
            <Flex>
              <div style={{ transform: "translateY(-2px)" }}>
                <StockIconTT
                  icon={DeviceIcons[resource]?.icon}
                  size="24"
                  dark
                />
              </div>
              <Space w={9} />
              <div>{`${model} (${serialNumber}). Редактирование`}</div>
            </Flex>
          </Title>
          <div style={{ display: "flex" }}>
            <Subtitle to={`/objects/${id}/apartments/${apartmentId}`}>
              {getApartmentFromFullAddress(address, true)}
            </Subtitle>
            <IsActive closingDate={closingDate} />
          </div>
        </div>
      </HeaderWrap>
    </Loader>
  );
};

export default Header;
