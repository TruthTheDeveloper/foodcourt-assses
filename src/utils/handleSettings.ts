import React from 'react';

export const handleSettingChange = (
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
) => {
  const { name, value, checked } = e.target;
  setPasswordSettings((prevSettings) => ({
    ...prevSettings,
    [name]: checked ? value : false,
  }));
};