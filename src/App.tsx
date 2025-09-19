import "./App.css";
import { Container, MantineProvider, Button} from "@mantine/core";
import { TaskColumn } from "./components/TaskColumn";
import { mockTasks } from "./data/mockTasks";
import { StrictMode } from "react";
import { useTasks } from "./hooks/useTasks";
import { TasksProvider } from "./contexts/TasksContext";

function KanbanBoard() {
  const {tasks, addTask} = useTasks();
  const aFazer = mockTasks.filter((t) => t.status === "aFazer");
  const emProgresso = mockTasks.filter((t) => t.status === "emProgresso");
  const concluido = mockTasks.filter((t) => t.status === "concluido");

  return (
    <StrictMode>
      <MantineProvider>
        <Container fluid className="p-6">
          <div className="flex justify-between items-cenetr mb-6">
            <h1 className="text-2xl font-bold">Kanban App</h1>
            <Button onClick={() => addTask('Nova tarefa', 'Descrição', 'aFazer')}> + Nova Tarefa</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskColumn title="A Fazer" tasks={aFazer} />
            <TaskColumn title="Em Progresso" tasks={emProgresso} />
            <TaskColumn title="Concluído" tasks={concluido} />
          </div>
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
  )
}

export default App;
