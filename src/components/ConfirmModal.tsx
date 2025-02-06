import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
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
    transform: scale(0.9);
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
`;

const ModalContainer = styled.div<{ isClosing: boolean }>`
  background: white;
  padding: 25px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
  position: relative;

  @media (max-width: 500px) {
    max-width: 350px;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #e74c3c;

  &:hover {
    color: #c0392b;
  }
`;

const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

const CancelButton = styled(Button)`
  background-color: #95a5a6;
  color: white;

  &:hover {
    background-color: #7f8c8d;
  }
`;

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onCancel, 300); 
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Message>{message}</Message>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>Excluir</ConfirmButton>
          <CancelButton onClick={handleClose}>Cancelar</CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default ConfirmModal;
