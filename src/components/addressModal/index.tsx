import React from "react";
import { Paper, Modal } from "@material-ui/core";
import QRCode from "qrcode.react";
import "./addressModal.css";

interface ModalProps {
  visible: boolean;
  address: string;
  handleClose: Function;
}

const AddressModal: React.FC<ModalProps> = ({
  visible,
  address,
  handleClose
}) => {
  return (
    <Modal open={visible} onClose={() => handleClose()} className="modal">
      <Paper className="modal-content">
        <QRCode value={address} size={256} />
        <p>{address}</p>
      </Paper>
    </Modal>
  );
};

export default AddressModal;
