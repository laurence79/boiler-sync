export const tryGetErrorMessage = (from: unknown): string => {
  return from instanceof Error ? from.message : 'Unknown error';
};
