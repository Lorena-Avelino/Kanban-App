import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Estudar React',
    description: 'Ler a documentação oficial do React',
    status: 'aFazer',
    order: 0,
  },
  {
    id: '2',
    title: 'Configurar Tailwind',
    description: 'Aplicar estilos básicos',
    status: 'emProgresso',
    order: 0,
  },
  {
    id: '3',
    title: 'Fazer deploy',
    description: 'Publicar no Vercel',
    status: 'concluido',
    order: 0,
  },
];
