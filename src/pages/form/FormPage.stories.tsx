import React from "react";
import { FormPage } from "./FormPage";
import { Meta } from "@storybook/react";

export default {
  component: FormPage,
  title: "Form / Form Page",
} as Meta;

export const Base = () => <FormPage />;
