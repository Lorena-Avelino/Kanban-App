import { ActionIcon, Card, Group, Text, Tooltip } from "@mantine/core";
import type { Task } from "../types/task";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder className="mb-2">
      <Group justify="space-between" align="center">
        <Text fw={500}>{task.title}</Text>
        <Group gap="xs">
          <Tooltip label="Editar">
            <ActionIcon variant="subtle" onClick={onEdit}>
              <IconPencil size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Excluir">
            <ActionIcon variant="subtle" onClick={onDelete}>
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      {task.description && (
        <Text size="sm" c="dimmed" mt="sm">
          {task.description}
        </Text>
      )}
    </Card>
  );
}
