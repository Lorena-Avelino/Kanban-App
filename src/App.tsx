import { Button, Container, MantineProvider, Modal } from "@mantine/core";
import { TaskColumn } from "./components/TaskColumn";
import { StrictMode, useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { TasksProvider } from "./contexts/TasksContext";
import { useDisclosure } from "@mantine/hooks";
import { TaskForm } from "./components/TaskForm";
import type { Task } from "./types/task";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

function KanbanBoard() {
  const { tasks, addTask, editTask, moveTask } = useTasks();
  const [opened, { open, close }] = useDisclosure(false);

  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    open();
  };

  const onCancel = () => {
    setEditingTask(undefined);
    close();
  };

  const handleSubmit = (
    title: string,
    description: string,
    status: Task["status"]
  ) => {
    if (editingTask) {
      editTask(editingTask.id, { title, description, status });
      setEditingTask(undefined);
    } else {
      addTask(title, description, status);
    }
    close();
  };

  const aFazer = tasks.filter((task) => task.status === "aFazer");
  const emProgresso = tasks.filter((task) => task.status === "emProgresso");
  const concluido = tasks.filter((task) => task.status === "concluido");

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const newStatus = destination.droppableId as Task["status"];
    moveTask(draggableId, newStatus, destination.index);
  };

  return (
    <StrictMode>
      <MantineProvider>
        <Container fluid className="p-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex justify-between items-cenetr mb-6">
              <h1 className="text-2xl font-bold">Kanban App</h1>
              <Button onClick={open}>+ Nova Tarefa</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TaskColumn
                title="A Fazer"
                status="aFazer"
                tasks={aFazer}
                onEdit={handleEdit}
              />
              <TaskColumn
                title="Em Progresso"
                status="emProgresso"
                tasks={emProgresso}
                onEdit={handleEdit}
              />
              <TaskColumn
                title="Concluído"
                status="concluido"
                tasks={concluido}
                onEdit={handleEdit}
              />
            </div>

            <Modal
              opened={opened}
              onClose={onCancel}
              title={"Criar Tarefa"}
              centered
              closeButtonProps={{ size: "sm", iconSize: 16 }}
            >
              <TaskForm
                initialData={editingTask}
                onSubmit={handleSubmit}
                onCancel={onCancel}
              />
            </Modal>
          </DragDropContext>
        </Container>
      </MantineProvider>
    </StrictMode>
  );
}

function App() {
  return (
    <TasksProvider>
      <KanbanBoard />
    </TasksProvider>
  );
}

export default App;
