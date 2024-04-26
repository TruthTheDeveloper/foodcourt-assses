import React from "react";
import { ModalContentContainer, Form } from "./styles";

interface ModalContentProps {
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

const ModalContent: React.FC<ModalContentProps> = ({
  passwordSettings,
  setPasswordSettings,
  handleSettingChange,
  onClose,
  tempPasswordSettings,
}) => {
  const handleMinLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    handleSettingChange(e, setPasswordSettings);
  };

  const handleSave = () => {
    setPasswordSettings(tempPasswordSettings);
    onClose(); // Close the modal
  };

  return (
    <ModalContentContainer>
      <h2>Password Settings</h2>
      <Form>
        <label>
          <input
            type="checkbox"
            name="uppercase"
            key="uppercase"
            defaultChecked={passwordSettings.uppercase}
            onChange={(e) => handleSettingChange(e, setPasswordSettings)}
          />
          At least 1 uppercase
        </label>
        <label>
          <input
            type="checkbox"
            name="lowercase"
            key="lowercase"
            defaultChecked={passwordSettings.lowercase}
            onChange={(e) => handleSettingChange(e, setPasswordSettings)}
          />
          At least 1 lowercase
        </label>
        <label>
          <input
            type="checkbox"
            name="number"
            key="number"
            defaultChecked={passwordSettings.number}
            onChange={(e) => handleSettingChange(e, setPasswordSettings)}
          />
          At least 1 figure
        </label>
        <label>
          <input
            type="checkbox"
            name="specialChar"
            key="specialChar"
            defaultChecked={passwordSettings.specialChar}
            onChange={(e) => handleSettingChange(e, setPasswordSettings)}
          />
          At least 1 special character - !@#$%^&*()
        </label>
        <label>
          <input
            type="checkbox"
            name="minLength"
            key="minLength"
            defaultChecked={passwordSettings.minLength >= 8}
            onChange={handleMinLengthChange}
          />
          At least 8 characters long
        </label>
      </Form>
      <button
        className="text-white bg-blue-600 py-2 px-3 mt-5"
        onClick={handleSave}
      >
        Save
      </button>
    </ModalContentContainer>
  );
};

export default ModalContent;
