export const assertUnreachable = (neverValue?: never) => {
  throw new Error(`Didn't expect to get here (exhaustiveness-check), Unexpected value: ${neverValue}`);
};