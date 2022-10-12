import { apartmentsDocumentListService } from '../apartmentsDocumentListService';

const $lastDocuments = apartmentsDocumentListService.outputs.$preparedDocumentsList.map(
  (list) => list.slice(0, 2)
);

export const documentsCardService = {
  inputs: {
    saveDocument: apartmentsDocumentListService.inputs.saveFile,
  },
  outputs: {
    $lastDocuments,
  },
  gates: {
    ApartmentIdGate: apartmentsDocumentListService.gates.ApartmentIdGate,
  },
};
