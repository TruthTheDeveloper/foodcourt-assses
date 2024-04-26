export const isFormValid = (
    password: string,
    passwordSettings: {
      uppercase: boolean;
      lowercase: boolean;
      number: boolean;
      specialChar: boolean;
      minLength: number;
    }
  ) => {
    
    const { uppercase, lowercase, number, specialChar, minLength } =
      passwordSettings;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()]/;

    // Return false if none of the password settings are selected
  if (!uppercase && !lowercase && !number && !specialChar && !minLength) {
    return false;
  }
  
    if (
      (uppercase && !uppercaseRegex.test(password)) ||
      (lowercase && !lowercaseRegex.test(password)) ||
      (number && !numberRegex.test(password)) ||
      (specialChar && !specialCharRegex.test(password)) ||
      (minLength && password.length < minLength)
    ) {
      return false;
    }
  
    return true;
  };