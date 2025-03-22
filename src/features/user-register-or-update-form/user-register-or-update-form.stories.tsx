import { Decorator, StoryObj } from "@storybook/react";
import { UserRegisterOrUpdateForm } from "./user-register-or-update-form";
import { UserContext } from "../../context/user-context";
import { http, HttpResponse } from "msw";
import { validatePasswordMock } from "./validate-password";
import e from "express";

const MockUserContextProvider = ({
  children,
  addUserReturnValue,
  removeUserReturnValue,
  updateUserReturnValue,
  getUserReturnValue,
}: {
  children: React.ReactNode;
  addUserReturnValue?: boolean;
  removeUserReturnValue?: boolean;
  updateUserReturnValue?: boolean;
  getUserReturnValue?: undefined;
}) => {
  const UserContextProvider = UserContext.Provider;

  const value = {
    users: [],
    addUser: async () => addUserReturnValue ?? true,
    removeUser: async () => removeUserReturnValue ?? true,
    updateUser: async () => updateUserReturnValue ?? true,
    getUser: async () => getUserReturnValue,
  };

  return <UserContextProvider value={value}>{children}</UserContextProvider>;
};

type Story = StoryObj<typeof UserRegisterOrUpdateForm>;

const MockUserContextProviderDecorator: Decorator = (Story, context) => {
  return (
    <MockUserContextProvider>{Story(context.args)}</MockUserContextProvider>
  );
};

export default {
  title: "features/UserRegisterOrUpdateForm",
  component: UserRegisterOrUpdateForm,
  decorators: [MockUserContextProviderDecorator],
  parameters: {
    msw: {
      handlers: [
        http.post("https://api.example.com/validate-password", async (x) => {
          const body = await x.request.text();
          const error = validatePasswordMock(body);
          return HttpResponse.json({ error, code: 1 });
        }),
      ],
    },
  },
};

export const Default: Story = {
  render: () => <UserRegisterOrUpdateForm />,
};

export const WithServerErrorOnSuccessfulAdd: Story = {
  render: () => (
    <MockUserContextProvider addUserReturnValue={false}>
      <UserRegisterOrUpdateForm />
    </MockUserContextProvider>
  ),
};

export const WithPasswordValidationError: Story = {
  render: () => <UserRegisterOrUpdateForm />,
  parameters: {
    msw: {
      handlers: [
        http.post("https://api.example.com/validate-password", () => {
          return HttpResponse.json({
            error: "Password is too short",
            code: 1,
          });
        }),
      ],
    },
  },
};
