import { validate as uuidValidate } from "uuid";

export function validateUUID(id: string) {
  if (!uuidValidate(id)) throw new Error("id must be as uuid");
  return id;
}
