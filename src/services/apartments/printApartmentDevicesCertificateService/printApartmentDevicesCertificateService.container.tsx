import React, { FC, useRef } from 'react';
import { printApartmentDevicesCertificateService } from './printApartmentDevicesCertificateService.models';
import { Certificate } from './view/Certificate';
import { useUnit } from 'effector-react';
import { Props } from './printApartmentDevicesCertificateService.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'ui-kit/Button';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { currentOrganizationService } from 'services/currentOrganizationService';

const { inputs, outputs, gates } = printApartmentDevicesCertificateService;
const { HomeownerCerificateGate } = gates;

export const PrintApartmentDevicesCertificateContainer: FC<Props> = ({
  homeownerId,
}) => {
  const currentManagingFirm = useUnit(
    currentOrganizationService.outputs.$currentManagingFirm,
  );

  const isPJKH = currentManagingFirm?.id === 4;

  const {
    closeIssueCertificateModalButtonClicked,
    homeownerCertificate,
    isLoading,
    isOpen,
  } = useUnit({
    homeownerCertificate: outputs.$homeownerCertificate,
    isLoading: outputs.$isLoading,
    isOpen: outputs.$isPrintIssueCertificateModalOpen,
    closeIssueCertificateModalButtonClicked:
      inputs.closeIssueCertificateModalButtonClicked,
  });

  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: certificateRef,
  });

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
          <Button onClick={() => handlePrint()} isLoading={isLoading}>
            Печать
          </Button>
        }
        form={
          <WithLoader isLoading={isLoading}>
            {homeownerCertificate && !isLoading && (
              <div style={{ marginBottom: 70 }} ref={certificateRef}>
                <Certificate
                  certificate={homeownerCertificate}
                  isPJKH={isPJKH}
                />
              </div>
            )}
          </WithLoader>
        }
      />
    </>
  );
};
