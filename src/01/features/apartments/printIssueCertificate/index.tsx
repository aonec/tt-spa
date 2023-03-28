import { useStore } from 'effector-react';
import React, { FC, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { ModalTT } from '01/shared/ui/ModalTT';
import { Certificate } from './Certificate';
import {
  $homeownerCertificatre,
  $isPrintIssueCertificateModalOpen,
  closeIssueCertificateModalButtonClicked,
  HomeownerCerificateGate,
  fetchHomeownerCertificate,
} from './models';
import { GetIssueCertificateModalProps } from './GetIssueCertificateModal.types';
import { Button } from 'ui-kit/Button';

export const GetIssueCertificateModal: FC<GetIssueCertificateModalProps> = ({
  apartment,
  homeownerId,
}) => {
  const visible = useStore($isPrintIssueCertificateModalOpen);

  const homeownerCertificate = useStore($homeownerCertificatre);
  const pendingCertificate = useStore(fetchHomeownerCertificate.pending);
  const certificateRef = useRef();

  if (!apartment?.homeownerAccounts?.length) return <></>;

  return (
    <>
      {visible && (
        <HomeownerCerificateGate
          id={
            (apartment?.homeownerAccounts || []).find(
              (account) => account.id === homeownerId,
            )?.id || null
          }
        />
      )}
      <ModalTT
        onCancel={closeIssueCertificateModalButtonClicked}
        visible={visible}
        title="Выдача справки"
        saveBtnText="Печать"
        customSubmit={
          <ReactToPrint
            trigger={() => (
              <Button isLoading={pendingCertificate}>Печать</Button>
            )}
            content={() => {
              const node = (certificateRef as any).current;

              return node;
            }}
          />
        }
      >
        {homeownerCertificate && !pendingCertificate && (
          <div style={{ marginBottom: 70 }} ref={certificateRef as any}>
            <Certificate certificate={homeownerCertificate} />
          </div>
        )}
      </ModalTT>
    </>
  );
};
