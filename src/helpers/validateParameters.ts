export const validateParameters = (
  parameterNames: string[],
  parameterValues: Record<string, string>
): boolean => {
  const missingProperties = parameterNames.except(Object.keys(parameterValues));

  if (missingProperties.any()) {
    missingProperties.forEach(prop => {
      console.error(`Missing value for "${prop}" parameter.`);
    });

    return false;
  }

  return true;
};
