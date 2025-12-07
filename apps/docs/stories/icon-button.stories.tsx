import type { Meta, StoryObj } from "@storybook/react";
import { Shredder } from "lucide-react";
import { IconButton } from "@repo/ds/ui";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  render: (props) => (
    <IconButton
      {...props}
      onClick={(): void => {
        // eslint-disable-next-line no-alert -- alert for demo
        alert("Hello Storybook!");
      }}
    >
      <Shredder color="red" size={48} />
    </IconButton>
  ),
  name: "IconButton",
  args: {
    children: "Hello",
    type: "button",
  },
};
