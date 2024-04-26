import styled from 'styled-components';

const SubmitButton = styled.button<{ disabled: boolean }>`
  padding: 0.5rem;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export default SubmitButton;