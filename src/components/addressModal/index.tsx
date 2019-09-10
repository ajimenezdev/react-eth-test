import React from "react";
import { Paper, Modal, IconButton, Icon } from "@material-ui/core";
import QRCode from "qrcode.react";
import { getAddressURL } from "../../data/ethereumData";
import "./addressModal.css";

interface ModalProps {
  visible: boolean;
  address: string;
  network: string;
  handleClose: Function;
}

const AddressModal: React.FC<ModalProps> = ({
  visible,
  address,
  network,
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
        <p className="modal-address">{address}</p>
        <div className="modal-actions">
          <IconButton
            aria-label="open"
            title="open"
            onClick={() =>
              window.open(getAddressURL(address, network), "_blank")
            }
          >
            <Icon>open_in_new</Icon>
          </IconButton>
          <IconButton
            aria-label="copy"
            title="copy"
            onClick={() => navigator.clipboard.writeText(address)}
          >
            <Icon>file_copy</Icon>
          </IconButton>
        </div>
      </Paper>
    </Modal>
  );
};

export default AddressModal;
