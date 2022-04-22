export const unsafe_cast = {
  ElementToHTMLElement: (node: Element) => node as HTMLElement,
};

export const assertUnreachable = (neverValue?: never) => {
  throw new TypeError(`Didn't expect to get here (exhaustiveness-check), Unexpected value: ${neverValue}`);
};
