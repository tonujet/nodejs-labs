import { config } from "dotenv";
import process from "process";
import { EnvVarSetterType } from "@type/env/env-var-setter.type.js";
import { EnvEnumType } from "@type/env/env-enum.type.js";

config();

const EnvEnum: EnvEnumType = {
  DB: {},
};

const setDbKeys: EnvVarSetterType = (key, value, envVarStart) => {
  const dbKey = key.slice(envVarStart.length);
  EnvEnum.DB[dbKey] = value;
};

const envVarSetters: Record<string, EnvVarSetterType> = {
  DB_: setDbKeys,
};

for (const envVarStart of Object.keys(envVarSetters)) {
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(envVarStart)) {
      const setter = envVarSetters[envVarStart];
      setter(key, value, envVarStart);
    }
  }
}

export { EnvEnum };
