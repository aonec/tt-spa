import { sample } from 'effector';
import moment from 'moment';
import { EReportFormat, EReportType } from 'api/types';
import { displayNodeArchiveService } from './displayNodeArchiveService.models';

displayNodeArchiveService.outputs.$nodeArchiveData
  .on(
    displayNodeArchiveService.inputs.fetchNodeArchiveDataFx.doneData,
    (_, data) => data,
  )
  .reset(
    displayNodeArchiveService.inputs.NodeArchiveGate.close,
    displayNodeArchiveService.inputs.fetchNodeArchiveDataFx.fail,
  );

sample({
  source: displayNodeArchiveService.outputs.$nodeId,
  clock: displayNodeArchiveService.inputs.loadNodeArchiveData,
  fn: (nodeId, payload) => ({
    NodeId: nodeId,
    ReportFormat: EReportFormat.Consumption,
    ReportType: payload.type || EReportType.Daily,
    From: moment(payload.from)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .utcOffset(0, true)
      .toISOString(),
    To: moment(payload.to)
      .set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      })
      .utcOffset(0, true)
      .endOf('day')
      .toISOString(),
  }),
  target: displayNodeArchiveService.inputs.fetchNodeArchiveDataFx,
});
