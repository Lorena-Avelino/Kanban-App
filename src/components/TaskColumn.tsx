import { Text, Title } from "@mantine/core";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../hooks/useTasks";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

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
      <div className="flex justify-between items-center mb-4">
        <Title order={4}>
          {title} <span> ({filteredTasks.length}) </span>
        </Title>
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[50px]"
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onEdit={() => handleEdit(task)}
                      onDelete={() => {
                        modals.openConfirmModal({
                          title: "Confirmar exclusão",
                          centered: true,
                          children: (
                            <Text size="sm">
                              Tem certeza que deseja excluir a tarefa{" "}
                              <b>{task.title}</b>?
                            </Text>
                          ),
                          labels: { confirm: "Excluir", cancel: "Cancelar" },
                          confirmProps: { color: "red" },
                          onConfirm: () => {
                            removeTask(task.id);
                            notifications.show({
                              title: "Removida",
                              message: "Tarefa deletada com sucesso 🗑️",
                              color: "red",
                            });
                          },
                        });
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
