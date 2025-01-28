import { PollActionType } from 'api/types';

export const PollActionTypeLookup: { [key in PollActionType]: string } = {
  [PollActionType.DuplicateReadings]: '-',
  [PollActionType.HousingCloseByCheckDate]: '-',
  [PollActionType.HousingExport]: '-',
  [PollActionType.IndividualCloseByCheckDate]: '-',
  [PollActionType.IndividualCloseWithoutReadings]: '-',
  [PollActionType.IndividualCreateTasksWithoutReadings]: '-',
  [PollActionType.IndividualExport]: 'Стандартный отчет',
  [PollActionType.MilurExport]: 'Нестандартный отчет (Милуры)',
  [PollActionType.OpenIndividualDevicesReport]: '-',
  [PollActionType.RunnersReports]: '-',
};
