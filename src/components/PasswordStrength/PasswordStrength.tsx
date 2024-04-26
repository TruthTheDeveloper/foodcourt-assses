import React, { useEffect, useState } from 'react';
import PasswordStrengthContainer from './styles';

interface PasswordStrengthProps {
  password: string;
  passwordSettings: {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
    minLength: number;
  };
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  passwordSettings,
}) => {
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    const { uppercase, lowercase, number, specialChar } = passwordSettings;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()]/;

    let strength = '';

    if (
      password.length >= 10 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    ) {
      strength = 'hard';
    } else if (
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      specialCharRegex.test(password)
    ) {
      strength = 'medium';
    } else {
      strength = 'easy';
    }

    setPasswordStrength(strength);
  }, [password, passwordSettings]);

  return (
    <PasswordStrengthContainer strength={passwordStrength}>
      Password Strength: {passwordStrength}
    </PasswordStrengthContainer>
  );
};

export default PasswordStrength;