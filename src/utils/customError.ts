import { TCustomError } from "../types";

export function customError(
  success: boolean = false,
  status: number = 500,
  message: string = "something went wrong",
) {
  const err: TCustomError = new Error(message);
  err.success = success;
  err.status = status;
  return err;
}
