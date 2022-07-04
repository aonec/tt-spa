import moment from 'moment-timezone';

const timezone = moment.tz.guess();

moment.tz.setDefault(timezone);

export { moment };
