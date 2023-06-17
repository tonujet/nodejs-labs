import { StatusCodes } from "http-status-codes";

export type AdditionalInfoType = Record<
  string,
  Record<"message" | "status", string | StatusCodes>
>;
