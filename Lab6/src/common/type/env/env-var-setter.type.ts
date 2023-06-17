export type EnvVarSetterType = (
  key: string,
  value: string | undefined,
  envVarStars: string
) => void;
