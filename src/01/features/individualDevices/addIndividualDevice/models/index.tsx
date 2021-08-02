import { createForm } from 'effector-forms/dist';

export const addIndividualDeviceForm = createForm({
  fields: {
    serialNumber: {
      init: '',
      rules: [{ name: 'required', validator: Boolean }],
    },
    lastCheckingDate: {
      init: null as string | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    futureCheckingDate: {
      init: null as string | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    lastCommercialAccountingDate: {
      init: null as string | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    documentsIds: {
      init: [] as number[],
    },
    bitDepth: {
      init: null as number | null,
    },
    scaleFactor: {
      init: null as number | null,
    },
  },
});
