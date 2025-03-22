type ValidationResponse = {
  error: string;
  code: number;
};

export const validatePassword = async (
  password: string
): Promise<ValidationResponse> => {
  try {
    const result = await fetch("https://api.example.com/validate-password", {
      method: "POST",
      body: password, // Super secure!
    });

    const jsonData = await result.json();
    return jsonData as ValidationResponse; // We should use zod here...
  } catch {
    return {
      error: "An unknown error occurred while validating the password",
      code: -1,
    };
  }
};

export const validatePasswordMock = (password: string): string => {
  if (password.length < 8) {
    return "Password is too short";
  }

  if (!/(?=.*?[A-Z])/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/(?=.*?[a-z])/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/(?=.*?[0-9])/.test(password)) {
    return "Password must contain at least one digit";
  }

  if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
    return "Password must contain at least one special character";
  }

  return "";
};
