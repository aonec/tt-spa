import { ModalTT } from '01/shared/ui/ModalTT';
import { Certificate } from '01/_pages/ApartmentProfile/components';
import { useStore } from 'effector-react';
import React from 'react';
import { $apartment } from '../displayApartment/models';
import {
  $homeownerCertificatre,
  $isPrintIssueCertificateModalOpen,
  closeIssueCertificateModalButtonClicked,
  HomeownerCerificateGate,
} from './models';

export const GetIssueCertificateModal = () => {
  const visible = useStore($isPrintIssueCertificateModalOpen);
  const apartment = useStore($apartment);

  const homeownerCertificate = useStore($homeownerCertificatre);

  console.log(homeownerCertificate, apartment);

  if (!apartment?.homeowners) return <></>;

  return (
    <>
      <HomeownerCerificateGate
        id={(apartment?.homeowners[0] as any).homeownerAccountId!}
      />
      <ModalTT
        onCancel={closeIssueCertificateModalButtonClicked}
        visible={visible}
        title="Выдача справки"
        saveBtnText="Печать"
      >
        {homeownerCertificate && (
          <Certificate certificate={homeownerCertificate} />
        )}
      </ModalTT>
    </>
  );
};
