import moment from 'moment';

export const formReadingToPush = (device) => {
  const pushReadings = device.readings[0];

  if (!pushReadings) return {};

  const deviceReadingObject = {
    deviceId: device.id,
    value1: pushReadings && +pushReadings?.value1,
    readingDate: moment().toISOString(true),
    uploadTime: moment().toISOString(true),
    isForced: true,
  };
  if (pushReadings.value2) {
    deviceReadingObject.value2 = +pushReadings.value2;
  }

  if (pushReadings.value3) {
    deviceReadingObject.value3 = +pushReadings.value3;
  }

  if (pushReadings.value4) {
    deviceReadingObject.value4 = +pushReadings.value4;
  }

  return deviceReadingObject;
};

export const formReadingsToPush = (devices) => {
  return devices.map((device) => formReadingToPush(device));
};
