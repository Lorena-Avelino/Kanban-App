import "./App.css";
import { Container, MantineProvider} from "@mantine/core";
import { TaskColumn } from "./components/TaskColumn";
import { mockTasks } from "./data/mockTasks";
import { StrictMode } from "react";

function App() {
  const aFazer = mockTasks.filter((t) => t.status === "aFazer");
  const emProgresso = mockTasks.filter((t) => t.status === "emProgresso");
  const concluido = mockTasks.filter((t) => t.status === "concluido");

  return (
    <StrictMode>
      <MantineProvider>
        <Container fluid className="p-6">
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

export default App;
