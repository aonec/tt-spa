import { ff } from '01/features/actsJournal/displayActsJournal/models';
import { createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';

export const correctionReadingsForm = createForm({
  fields: {
    readingValue: {
      init: ff<string>(),
    },
    needSeniorOperatorCheck: {
      init: false,
    },
    comment: {
      init: '',
    },
  },
});

export const completeStage = createEvent();
