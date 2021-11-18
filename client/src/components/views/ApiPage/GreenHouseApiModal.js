import React, { useState } from "react";
import Modal from "react-modal";

import PropTypes from "prop-types";
import styled from "styled-components";
import GreenHouseApiModalItem from "./GreenHouseApiModalItem";
import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: row;
  flex-wrap: nowrap;
  float: left;
`;

const customStyles = {
  content: {
    width: "60vw",
    height: "70vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    // top: "0",
    // left: "0",
    // right: "0",
    // bottom: "0",
    backgroundColor: "rgba(118, 135, 163, 0.75)",
  },
};

export default function SeaTempApiModal(className, visible, children) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={() => setModalIsOpen(true)}
      >
        한국 온실가스 배출 변화
      </Button>
      {/* <ModalWrapper className={className} visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner"> */}
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <CloseIcon
          onClick={() => setModalIsOpen(false)}
          color="action"
          fontSize="large"
          cursor="pointer"
        ></CloseIcon>
        <Container>
          <GreenHouseApiModalItem />
        </Container>
      </Modal>
      {/* </ModalInner>
      </ModalWrapper> */}
    </>
  );
}

Modal.setAppElement("#root");
