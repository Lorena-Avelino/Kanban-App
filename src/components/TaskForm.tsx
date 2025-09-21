import { Button, Select, Textarea, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import type { Task } from "../types/task";

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (
    title: string,
    description: string,
    status: Task["status"]
  ) => void;
  onCancel: () => void;
}

export function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState<Task["status"]>(
    initialData?.status || "aFazer"
  );

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setStatus(initialData?.status || "aFazer");
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, description, status);
    setTitle("");
    setDescription("");
    setStatus("aFazer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Título"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        required
      />
      <Textarea
        label="Descrição"
        placeholder="Digite a descrição"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />
      <Select
        label="Status da Tarefa"
        placeholder="Escolha o status da sua tarefa"
        size="sm"
        data={[
          {value: "aFazer", label: "A Fazer"},
          {value: "emProgresso", label: "Em Progresso"},
          {value: "concluido", label: "Concluído"}
        ]}
        value={status}
        onChange={(value) => setStatus(value as Task["status"])}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
