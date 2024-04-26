import styled from 'styled-components';

const PasswordStrengthContainer = styled.div<{ strength: string }>`
  font-weight: bold;
  color: ${({ strength }) => {
    switch (strength) {
      case 'hard':
        return 'green';
      case 'medium':
        return 'orange';
      case 'easy':
        return 'red';
      default:
        return 'black';
    }
  }};
`;

export default PasswordStrengthContainer
