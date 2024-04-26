import React from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import PasswordStrength from '../PasswordStrength/PasswordStrength';
import { Container, FormStyled } from './styles';


interface FormProps {
  email: string;
  password: string;
  passwordSettings: {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
    minLength: number;
  };
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitDisabled: boolean;
}

const Form: React.FC<FormProps> = ({
  email,
  password,
  passwordSettings,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  isSubmitDisabled,
  
}) => {

  
  return (
    <Container>
      <FormStyled onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={Object.values(passwordSettings).every((value) => !value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={Object.values(passwordSettings).every((value) => !value)}
        />
        <PasswordStrength password={password} passwordSettings={passwordSettings} />
        <SubmitButton type="submit" disabled={isSubmitDisabled}>
          Submit
        </SubmitButton>
      </FormStyled>
    </Container>
  );
};

export default Form;