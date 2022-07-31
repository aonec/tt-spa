import { useStore } from 'effector-react';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Loader } from '../../../components';
import { ModalTT } from '../../../shared/ui/ModalTT';
import { ButtonTT } from '../../../tt-components';
import { Certificate } from '../../../_pages/ApartmentProfile/components';
import { $currentPersonalNumberIndex } from '../../homeowner/displayHomeowner/models';
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

  const homeownerIndex = useStore($currentPersonalNumberIndex);

  if (!apartment?.homeownerAccounts?.length) return <></>;

  return (
    <>
      {visible && (
        <HomeownerCerificateGate
          id={(apartment?.homeownerAccounts[homeownerIndex] as any)?.id!}
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
