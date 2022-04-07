import clamp from "lodash/clamp";

export type Percentage = number;

export function formatProgress(progress: number) {
  // value between 0 - 100;
  const progressValue: Percentage = Math.ceil(clamp(progress * 100, 0, 100));
  // value between 0 - 1;
  const unitInterval = progressValue / 100;

  const isCompleted = progressValue === 100;

  return { progressValue, unitInterval, isCompleted };
}