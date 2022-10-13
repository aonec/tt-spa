import React, { useEffect, useState } from 'react';
import * as s from '01/r_comp';
import styled from 'reshadow/macro';
import { getDevicesByApartment } from '../../../../_api/readings_page';
import DeviceReadingForm from './DeviceReadingForm/DeviceReadingForm';
import { formReadingsToPush } from '../../../../utils/formReadingsToPush';
import { setDevices } from '../../../../Redux/ducks/readings/actionCreators';
import { selectDevices } from '../../../../Redux/ducks/readings/selectors';
import { useDispatch, useSelector } from 'react-redux';

const AddReadings = ({ apartmentId, addReadings, readingsBlocked }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [devices, setDevices] = useState();

  // const [state, dispatch] = React.useReducer(readingsReducer, initialState);
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);

  useEffect(() => {
    async function getDevices() {
      setIsLoading(true);
      const devicesObj = await getDevicesByApartment(apartmentId);
      dispatch(setDevices(devicesObj));
      setIsLoading(false);
    }

    getDevices();
  }, []);

  useEffect(() => {
    const readingsToPush = formReadingsToPush(devices);
    addReadings(readingsToPush);
  }, [devices, readingsBlocked]);

  if (isLoading) return 'ЗАГРУЗКА...';

  const readings = devices.map((device) => (
    <DeviceReadingForm
      readingsBlocked={readingsBlocked}
      key={device.id}
      device={device}
    />
  ));

  return styled(s.input)(
    <div style={{ gridArea: 'ar' }}>
      <input_frame data-disabled data-big style={{ marginBottom: 30 }}>
        <input disabled value={'Ввод показаний'} />
      </input_frame>
      {readings}
    </div>
  );
};

export default AddReadings;
