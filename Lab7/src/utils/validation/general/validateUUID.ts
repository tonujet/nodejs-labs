const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

export function validateUUID(id: string) {
  if (!uuidRegex.test(id)) throw new Error("id must be as uuid");
  return id;
}
