import React from "react";

interface ModalProps {
  visible: boolean;
}

const AddressModal: React.FC<ModalProps> = ({ visible }) => {
  return <div className="form">{visible && <p>Address Modal</p>}</div>;
};

export default AddressModal;
