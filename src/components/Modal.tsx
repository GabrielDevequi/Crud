import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 10px;
`;

const ModalContainer = styled.div<{ isClosing: boolean }>`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 550px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.15s ease-in-out;
  transition: transform 0.15s ease-in-out;
  position: relative;

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  color: #444;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 150); 
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
