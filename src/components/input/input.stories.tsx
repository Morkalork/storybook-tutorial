import { StoryObj } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "components/input",
  component: Input,
};

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => <Input {...args} />,
};
