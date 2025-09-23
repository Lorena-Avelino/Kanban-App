import type { Task } from "../types/task";

export function isValidTask(obj: any): obj is Task {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    (obj.status === "aFazer" ||
      obj.status === "emProgresso" ||
      obj.status === "concluido") &&
    typeof obj.order === "number"
  );
}
