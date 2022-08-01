import { useContext } from "react";
import { ApartmentDeviceItem } from "./ApartmentDeviceItem";
import { ApartmentDevicesContext } from "../ApartmentDevices";
import { useParams } from "react-router";
import { ReadingsHistoryModal } from "../../../../features/readings/displayReadingHistory/ReadingsHistoryModal";

export function ApartmentDevicesList({ sliderIndex, showClosed }) {
  const devices = useContext(ApartmentDevicesContext);

  const params = useParams();

  if (!devices) return null;

  const validDeviceElems = devices
    ?.filter((elem) => (!showClosed ? elem.closingDate === null : true))
    .map((device) => (
      <ApartmentDeviceItem device={device} sliderIndex={sliderIndex} />
    ));

  return (
    <>
      <ReadingsHistoryModal apartmentId={params[1]} readonly />
      {validDeviceElems}
    </>
  );
}
export default ApartmentDevicesList;
