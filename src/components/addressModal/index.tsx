import React from "react";
import { Paper, Modal, IconButton, Icon } from "@material-ui/core";
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
        <IconButton
          aria-label="close"
          className="modal-closeIcon"
          onClick={() => handleClose()}
        >
          <Icon>close</Icon>
        </IconButton>
        <QRCode value={address} size={256} />
        <p>{address}</p>
      </Paper>
    </Modal>
  );
};

export default AddressModal;
