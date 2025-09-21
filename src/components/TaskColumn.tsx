import { Stack, Text, Title } from "@mantine/core";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../hooks/useTasks";

interface TaskColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onEdit?: (task: Task) => void;
}

export function TaskColumn({ title, status, tasks, onEdit }: TaskColumnProps) {
  const { removeTask } = useTasks();

  const filteredTasks = tasks.filter((task) => task.status === status);

  const handleEdit = (task: Task) => {
    onEdit ? onEdit(task) : () => {};
  };

  return (
    <div className="p-4 rounded-md flex-1">
      <div className="flex justify_between items-center mb-4">
        <Title order={4}>
          {title} <span> ({tasks.length}) </span>
        </Title>
      </div>
      <Stack>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => handleEdit(task)}
            onDelete={() => removeTask(task.id)}
          />
        ))}

        {filteredTasks.length === 0 && (
          <Text size="sm" c="dimmed">
            Nenhuma tarefa
          </Text>
        )}
      </Stack>
    </div>
  );
}
