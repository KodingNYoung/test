import React from 'react';
import CertificationModal from './CertificationModal';
import PortfolioModal from './PortfolioModal';

const EditModal = ({
  open,
  closeModal,
  item,
  handlePortfolioUpdate,
  handleCertificationUpdate,
  portfolioUpdating,
  certUpdating,
}) => {
  return (
    <>
      {item?.item?.toLowerCase() === 'portfolio' ? (
        <PortfolioModal
          open={open}
          closeModal={closeModal}
          mode='Edit'
          editData={item.data}
          handlePortfolioUpdate={handlePortfolioUpdate}
          portfolioUpdating={portfolioUpdating}
        />
      ) : (
        <CertificationModal
          open={open}
          closeModal={closeModal}
          mode='Edit'
          editData={item.data}
          handleCertificationUpdate={handleCertificationUpdate}
          certUpdating={certUpdating}
        />
      )}
    </>
  );
};

export default EditModal;
