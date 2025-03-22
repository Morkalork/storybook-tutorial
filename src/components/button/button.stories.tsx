import { Button } from "./button";
import { StoryObj } from "@storybook/react";

export default {
  title: "components/button",
  component: Button,
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args}>Click me</Button>,
};
