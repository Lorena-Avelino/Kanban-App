import {
  Button,
  Container,
  Group,
  MantineProvider,
  Modal,
} from "@mantine/core";
import { TaskColumn } from "./components/TaskColumn";
import React, { StrictMode, useRef, useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { TasksProvider } from "./contexts/TasksContext";
import { useDisclosure } from "@mantine/hooks";
import { TaskForm } from "./components/TaskForm";
import type { Task } from "./types/task";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { exportTasks, importTasks } from "./utils/io";
import { notifications, Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

function KanbanBoard() {
  const { tasks, addTask, editTask, moveTask, setAllTasks } = useTasks();
  const [opened, { open, close }] = useDisclosure(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleExport = () => {
    exportTasks(tasks);
    notifications.show({
      title: "Exportado",
      message: "Arquivo exportado com sucesso 💾",
      color: "teal",
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    importTasks(
      file,
      (tasks) => {
        setAllTasks(tasks);
        notifications.show({
          title: "Importado",
          message: "Arquivo importado com sucesso 📂",
          color: "green",
        });
      },
      (msg) =>
        notifications.show({
          title: "Erro",
          message: msg,
          color: "red",
        })
    );
    event.target.value = "";
  };

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
      notifications.show({
        title: "Atualizada",
        message: "Tarefa atualizada com sucesso",
        color: "blue",
      });
      setEditingTask(undefined);
    } else {
      addTask(title, description, status);
      notifications.show({
        title: "Sucesso",
        message: "Tarefa criada com sucesso",
        color: "green",
      });
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
      <Container fluid className="p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold">Kanban App</h1>
            <Group wrap="wrap" gap="xs">
              <Button onClick={handleExport} variant="outline">
                Exportar
              </Button>
              <Button onClick={handleImportClick} variant="outline">
                Importar
              </Button>
              <Button onClick={open}>+ Nova Tarefa</Button>
            </Group>

            <input
              type="file"
              accept="application/json"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImportChange}
            />
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
    </StrictMode>
  );
}

function App() {
  return (
    <TasksProvider>
      <MantineProvider>
        <ModalsProvider>
          <Notifications position="top-right" autoClose={5000} />
          <KanbanBoard />
        </ModalsProvider>
      </MantineProvider>
    </TasksProvider>
  );
}

export default App;
