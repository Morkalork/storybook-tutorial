import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border: 2px solid #4f46e5; /* Same elegant blue as the button */
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.1);

  &:focus {
    border-color: #4338ca; /* Slightly darker shade on focus */
    box-shadow: 0 4px 8px rgba(79, 70, 229, 0.2);
  }

  &::placeholder {
    color: #9ca3af; /* Light gray placeholder text */
  }
`;

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * A text input component that visually matches our blue button styling.
 */
export const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};
