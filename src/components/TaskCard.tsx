import { Card, Text } from "@mantine/core";
import type { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
}

export function TaskCard({task}: TaskCardProps) {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder className="mb-2">
            <Text fw={500}>{task.title}</Text>
        </Card>
    )
}