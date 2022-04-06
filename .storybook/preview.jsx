import * as jest from "jest-mock";
window.jest = jest;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import React from "react";
import { AppProvider } from "../src/shared/appProvider/app-provider"
import { addDecorator } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';

initializeWorker({ onUnhandledRequest: "error" });
addDecorator(mswDecorator);
export const decorators = [
  mswDecorator,
  (Story) => <AppProvider><Story /></AppProvider>
];