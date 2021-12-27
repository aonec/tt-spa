import { createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';
import { createGate } from 'effector-react';

export const correctionReadingsForm = createForm({
  fields: {
    readingValue: {
      init: {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
      },
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

export const CorrectionReadingsGate = createGate();
