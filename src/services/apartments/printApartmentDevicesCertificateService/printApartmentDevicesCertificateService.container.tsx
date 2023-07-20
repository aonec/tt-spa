import React, { FC, useRef } from 'react';
import { printApartmentDevicesCertificateService } from './printApartmentDevicesCertificateService.models';
import { Certificate } from './view/Certificate';
import { useEvent, useStore } from 'effector-react';
import { Props } from './printApartmentDevicesCertificateService.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import ReactToPrint from 'react-to-print';
import { Button } from 'ui-kit/Button';
import { WithLoader } from 'ui-kit/sharedComponents/WithLoader';

const { inputs, outputs, gates } = printApartmentDevicesCertificateService;
const { HomeownerCerificateGate } = gates;

export const PrintApartmentDevicesCertificateContainer: FC<Props> = ({
  homeownerId,
}) => {
  const homeownerCertificate = useStore(outputs.$homeownerCertificate);
  const isLoading = useStore(outputs.$isLoading);
  const isOpen = useStore(outputs.$isPrintIssueCertificateModalOpen);

  const closeIssueCertificateModalButtonClicked = useEvent(
    inputs.closeIssueCertificateModalButtonClicked,
  );

  const certificateRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && <HomeownerCerificateGate id={homeownerId} />}
      <FormModal
        formId="apartment-devivces-issue-certificate"
        onCancel={closeIssueCertificateModalButtonClicked}
        visible={isOpen}
        title="Выдача справки"
        submitBtnText="Печать"
        customSubmit={
          <ReactToPrint
            trigger={() => <Button isLoading={isLoading}>Печать</Button>}
            content={() => {
              const node = (certificateRef as any).current;

              return node;
            }}
          />
        }
        form={
          <WithLoader isLoading={isLoading}>
            {homeownerCertificate && !isLoading && (
              <div style={{ marginBottom: 70 }} ref={certificateRef}>
                <Certificate certificate={homeownerCertificate} />
              </div>
            )}
          </WithLoader>
        }
      />
    </>
  );
};
