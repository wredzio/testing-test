/* eslint-disable func-names */
import { findByText, waitFor } from "@testing-library/react";

declare global {
  interface HTMLElement {
    expectTextDisplayed(text: string): Promise<HTMLElement>;
    expectTextDisappeared(text: string): Promise<void>;
    expectLoaderDisappeared(): Promise<void>;
  }
}

HTMLElement.prototype.expectTextDisplayed = function (text: string): Promise<HTMLElement> {
  return findByText(this, text);
};

HTMLElement.prototype.expectTextDisappeared = function (text: string): Promise<void> {
  return waitFor(() => {
    // await text disappears after clicked
    expect(this).not.toHaveTextContent(text);
  });
};
HTMLElement.prototype.expectLoaderDisappeared = function (): Promise<void> {
  return waitFor(() => {
    expect(this).not.toContainElement(this.getElementsByClassName("ActivityIndicator").item(0) as HTMLElement);
  });
};

export {};
