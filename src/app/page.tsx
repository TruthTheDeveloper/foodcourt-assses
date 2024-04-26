"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { SettingsButton, SettingsButtonContainer, Container } from "../styles";
import { isFormValid } from "../utils";


const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordSettings, setPasswordSettings] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    minLength: 0,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalSettingsChanged, setModalSettingsChanged] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const [tempPasswordSettings, setTempPasswordSettings] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    minLength: 0,
  });



  useEffect(() => {
    const savedSettings = localStorage.getItem("passwordSettings");
    const savedModalSettingsChanged = localStorage.getItem(
      "modalSettingsChanged"
    );

    if (savedSettings) {
      setPasswordSettings(JSON.parse(savedSettings));

      
        setShowModal(false);
      
    } else {
      // If there are no saved settings, use the default settings
      setShowModal(true);

      setPasswordSettings({
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
        minLength: 0,
      });
    }


    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (modalSettingsChanged === true) {
      localStorage.setItem(
        "passwordSettings",
        JSON.stringify(passwordSettings)
      );
    }
    localStorage.setItem(
      "modalSettingsChanged",
      modalSettingsChanged.toString()
    );
  }, [passwordSettings, modalSettingsChanged]);

  useEffect(() => {
    const noSettingsSelected =
      !passwordSettings.uppercase &&
      !passwordSettings.lowercase &&
      !passwordSettings.number &&
      !passwordSettings.specialChar &&
      !passwordSettings.minLength;

    setIsSubmitDisabled(
      noSettingsSelected || !isFormValid(password, passwordSettings)
    );
  }, [password, passwordSettings]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleModalSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setModalSettingsChanged(true);

    if (name === "minLength") {
      setTempPasswordSettings((prevSettings) => ({
        ...prevSettings,
        minLength: checked ? 8 : 0,
      }));
    } else {
      setTempPasswordSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));
    }
  };

  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <Container>
          <SettingsButtonContainer>
            <SettingsButton onClick={() => setShowModal(true)}>
              Settings
            </SettingsButton>
          </SettingsButtonContainer>
          {showModal && (
            <Modal
              passwordSettings={passwordSettings}
              setPasswordSettings={setPasswordSettings}
              handleSettingChange={handleModalSettingChange}
              onClose={() => setShowModal(false)}
              ref={modalRef}
              tempPasswordSettings={tempPasswordSettings}
            />
          )}
          <Form
            email={email}
            password={password}
            passwordSettings={passwordSettings}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
            isSubmitDisabled={isSubmitDisabled}
          />
        </Container>
      )}
    </>
  );
};

export default App;
