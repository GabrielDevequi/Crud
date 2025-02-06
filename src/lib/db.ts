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
      users: "++id, name, status, agent",
    });
  }
}


export const db = new MyDatabase();
