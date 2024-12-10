import { regularReportsService } from './regularReportsService.models';

const {
  // inputs,
  // outputs,
  gates: { PageGate },
} = regularReportsService;

export const RegularReportsContainer = () => {
  return (
    <>
      <PageGate />
    </>
  );
};
