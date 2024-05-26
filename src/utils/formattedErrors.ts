import { ZodError } from "zod";

export function formatErrors(error: ZodError) {
  return error.issues.reduce((acc: Record<string, string>, issue) => {
    if (issue.code === "unrecognized_keys") {
      issue.keys.forEach((key) => {
        acc[key] = `Unrecognized key: '${key}'`;
      });
    } else {
      acc[issue.path.join(".")] = issue.message;
    }
    return acc;
  }, {});
}
