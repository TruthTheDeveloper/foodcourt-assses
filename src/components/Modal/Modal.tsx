import React, { forwardRef } from "react";
import ModalContent from "./ModalContent";
import { ModalContainer } from "./styles";

interface ModalProps {
  passwordSettings: {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
    minLength: number;
  };
  tempPasswordSettings: {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
    minLength: number;
  };
  setPasswordSettings: React.Dispatch<
    React.SetStateAction<{
      uppercase: boolean;
      lowercase: boolean;
      number: boolean;
      specialChar: boolean;
      minLength: number;
    }>
  >;
  handleSettingChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setPasswordSettings: React.Dispatch<
      React.SetStateAction<{
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        specialChar: boolean;
        minLength: number;
      }>
    >
  ) => void;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      passwordSettings,
      setPasswordSettings,
      handleSettingChange,
      onClose,
      tempPasswordSettings,
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Prevent closing when modal is clicked
      e.stopPropagation();
    };
    return (
      <ModalContainer onClick={handleClick}>
        <div ref={ref}>
          <ModalContent
            passwordSettings={passwordSettings}
            setPasswordSettings={setPasswordSettings}
            handleSettingChange={handleSettingChange}
            onClose={onClose}
            tempPasswordSettings={tempPasswordSettings}
          />
        </div>
      </ModalContainer>
    );
  }
);

export default Modal;
