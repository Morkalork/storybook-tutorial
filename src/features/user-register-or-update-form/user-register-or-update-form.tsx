import React, { useEffect, useState } from "react";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { useUserContext } from "../../context/user-context";
import styled from "styled-components";
import { validatePassword } from "./validate-password";

const StyledForm = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledSuccessMessage = styled.p`
  color: green;
  font-style: italic;
`;

const StyledServerErrorMessage = styled.p`
  color: red;
`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UserRegisterOrUpdateFormProps = {
  userId?: string;
};

export const UserRegisterOrUpdateForm = ({
  userId,
}: UserRegisterOrUpdateFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showServerError, setShowServerError] = useState(false);

  const { addUser, getUser } = useUserContext();

  useEffect(() => {
    const loadUser = async () => {
      if (userId) {
        const user = await getUser(userId);
        if (user) {
          setUsername(user.name);
          setEmail(user.email);
          setPassword(user.password);
        }
      }
    };

    loadUser();
  }, [getUser, userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setShowSuccessMessage(false);
    setShowServerError(false);

    let hasError = false;

    if (!username.trim()) {
      setUsernameError("Username is required.");
      hasError = true;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    const passwordValidationError = await validatePassword(password);
    if (passwordValidationError.error) {
      setPasswordError(passwordValidationError.error);
      hasError = true;
    }

    if (!hasError) {
      const userAddedResult = await addUser({
        id: Math.random().toString(),
        name: username,
        email,
        password,
      });

      if (userAddedResult) {
        setUsername("");
        setEmail("");
        setPassword("");
        setShowSuccessMessage(true);
      } else {
        setShowServerError(true);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Register for My App</h2>

      {showSuccessMessage && (
        <StyledSuccessMessage>
          You have successfully registered with my App!
        </StyledSuccessMessage>
      )}

      {showServerError && (
        <StyledServerErrorMessage>
          <strong>Error</strong>: Failed to register. Please try again.
        </StyledServerErrorMessage>
      )}

      {usernameError && <span style={{ color: "red" }}>{usernameError}</span>}

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {emailError && <span style={{ color: "red" }}>{emailError}</span>}
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button>Register</Button>
    </StyledForm>
  );
};
