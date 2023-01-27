import { combine, guard } from 'effector';
import { groupReportService } from './groupReportService.model';
import { sendReportToEmailService } from './sendReportToEmailService';

guard({
  source: combine(
    groupReportService.outputs.$downloadReportPayload,
    sendReportToEmailService.outputs.$defaultEmail,
    (payload, DelayedEmailTarget) => {
      if (!payload) {
        return null;
      }
      return { ...payload, DelayedEmailTarget };
    },
  ),
  clock: sendReportToEmailService.inputs.submitEmail,
  filter: Boolean,
  target: groupReportService.inputs.getGroupReport,
});
