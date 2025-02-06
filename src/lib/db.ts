import Dexie, { Table } from "dexie";

export interface User {
  id?: number;
  name: string;
  status: string;
  agent: string;
  creationDate: string;
}

class MyDatabase extends Dexie {
  users!: Table<User, number>;

  constructor() {
    super("LocalDB");
    this.version(1).stores({
      users: "++id, name, status, agent, creationDate",
    });

    this.populateInitialData();
  }

  // Popula a tabela com dados iniciais se estiver vazia
  async populateInitialData() {
    const count = await this.users.count();
    if (count === 0) {
      await this.users.bulkAdd([
        { name: "João Silva", status: "Ativo", agent: "Atendente 1", creationDate: new Date().toISOString() },
        { name: "Maria Oliveira", status: "Inativo", agent: "Atendente 2", creationDate: new Date().toISOString() },
        { name: "Carlos Souza", status: "Ativo", agent: "Atendente 3", creationDate: new Date().toISOString() },
      ]);
    }
  }
}

export const db = new MyDatabase();
