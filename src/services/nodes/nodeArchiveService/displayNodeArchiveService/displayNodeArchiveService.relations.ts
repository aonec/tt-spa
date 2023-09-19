import { sample } from 'effector';
import dayjs from 'api/dayjs';
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
    From: dayjs(payload.from)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .utcOffset(0, true)
      .toISOString(),
    To: dayjs(payload.to)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .utcOffset(0, true)
      .endOf('day')
      .toISOString(),
  }),
  target: displayNodeArchiveService.inputs.fetchNodeArchiveDataFx,
});
