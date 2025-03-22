import type { Preview } from "@storybook/react";
import "../src/imports";
import { initialize as initializeMSW, mswLoader } from "msw-storybook-addon";

initializeMSW();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
