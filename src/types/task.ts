export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'aFazer' | 'emProgresso' | 'concluido';
  order: number;
};