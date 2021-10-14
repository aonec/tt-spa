import { Loader } from '01/components';
import { ModalTT } from '01/shared/ui/ModalTT';
import { ButtonTT } from '01/tt-components';
import { Certificate } from '01/_pages/ApartmentProfile/components';
import { useStore } from 'effector-react';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { $apartment } from '../displayApartment/models';
import {
  $homeownerCertificatre,
  $isPrintIssueCertificateModalOpen,
  closeIssueCertificateModalButtonClicked,
  HomeownerCerificateGate,
  fetchHomeownerCertificate,
} from './models';

export const GetIssueCertificateModal = () => {
  const visible = useStore($isPrintIssueCertificateModalOpen);
  const apartment = useStore($apartment);

  const homeownerCertificate = useStore($homeownerCertificatre);
  const pendingCertificate = useStore(fetchHomeownerCertificate.pending);
  const certificateRef = useRef();

  if (!apartment?.homeownerAccounts?.length) return <></>;

  return (
    <>
      {visible && (
        <HomeownerCerificateGate
          id={(apartment?.homeownerAccounts[0] as any).homeownerAccountId!}
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
              <ButtonTT color="blue" key="submit" disabled={pendingCertificate}>
                {pendingCertificate ? <Loader show /> : 'Печать'}
              </ButtonTT>
            )}
            content={() => (certificateRef as any).current}
          />
        }
      >
        {homeownerCertificate && !pendingCertificate && (
          <div style={{ marginBottom: 70 }}>
            <Certificate
              certificate={homeownerCertificate}
              ref={certificateRef as any}
            />
          </div>
        )}
      </ModalTT>
    </>
  );
};
