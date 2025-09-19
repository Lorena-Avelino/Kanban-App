import { Button, Stack, Title } from "@mantine/core"
import type { Task } from "../types/task"
import { TaskCard } from "./TaskCard"

interface TaskColumnProps {
    title: string
    tasks: Task[]
}

export function TaskColumn({title, tasks}: TaskColumnProps) {
    return (
        <div className="p-4 rounded-md flex-1">
            <div className="flex justify_between items-center mb-4">
                <Title order={4}>
                    {title} <span> ({tasks.length}) </span>
                </Title>
                <Button size="xs">+</Button>
            </div>
            <Stack>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </Stack>
        </div>
    )
}