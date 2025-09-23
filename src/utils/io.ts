import type { Task } from "../types/task";
import { isValidTask } from "./validation";

export function exportTasks(tasks: Task[]) {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const arq = document.createElement("a");
  arq.href = url;
  arq.download = `kanban-tasks-${new Date().toISOString()}.json`;
  arq.click();
  URL.revokeObjectURL(url);
}

export function importTasks(
  file: File,
  onSuccess: (tasks: Task[]) => void,
  onError: (msg: string) => void
) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target?.result as string);
      if (Array.isArray(parsed) && parsed.every(isValidTask)) {
        const reindexed = ["aFazer", "emProgresso", "concluido"].flatMap(
          (status) =>
            parsed
              .filter((task) => task.status === status).sort((a, b) => a.order - b.order).map((task, i) => ({...task, order: i}))
              
        );
        onSuccess(reindexed);
      } else {
        onError("Arquivo inválido: deve ser um array de tarefas válidas.");
      }
    } catch (err) {
      onError("Erro ao ler arquivo JSON.");
    }
  };
  reader.readAsText(file);
}
