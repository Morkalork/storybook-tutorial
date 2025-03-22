import { HTMLAttributes } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);

  &:hover {
    background-color: #4338ca;
    box-shadow: 0 6px 12px rgba(79, 70, 229, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #3730a3;
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.2);
  }
`;

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
