"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { db, User } from "@/lib/db";
import {
  Container,
  Message,
  AddButton,
  FilterContainer,
  Select,
  Input,
  TableContainer,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  EditButton,
  ViewButton,
  DeleteButton,
  PaginationContainer,
  PaginationButton,
  DeleteSelectedButton,
  ModalTitle,
  StyledInput,
  SaveButton,
} from "@/components/TableStyles";

export default function Table() {
  const [data, setData] = useState<User[]>([]);
  const [filterColumn, setFilterColumn] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<{ name: string; status: string; agent: string } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [confirmModal, setConfirmModal] = useState<{ id: number | null; multiple: boolean }>({
    id: null,
    multiple: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const showMessage = (msg: string, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };

  const fetchData = async () => {
    try {
      const users = await db.users.toArray();
      setData(users);
      adjustPagination(users);
      // console.log(" Dados carregados:", users);
    } catch (error) {
      console.error("❌ Erro ao buscar dados do IndexedDB:", error);
      alert("Erro ao carregar dados.");
      setData([]);
    }
  };

  const handleFilterColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterColumn(e.target.value);
    setFilterValue("");
  };

  const adjustPagination = (users: User[]) => {
    const filtered = users.filter((user) => {
      const value = user[filterColumn as keyof User];
      if (filterColumn === "id") {
        return value && String(value).includes(filterValue);
      }
      return value && String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
    const totalPages = Math.ceil(filtered.length / pageSize);

    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  };

  const handleDeleteUser = (id: number) => {
    setConfirmModal({ multiple: false, id });
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setConfirmModal({ multiple: true, id: null });
  };

  const confirmDelete = async () => {
    try {
      if (confirmModal.multiple) {
        await db.users.bulkDelete(selectedIds);
        setSelectedIds([]);
        showMessage("✅ Usuários excluídos com sucesso!");
      } else if (confirmModal.id !== null) {
         // console.log("Excluuindo:", confirmModal.id);
        await db.users.delete(confirmModal.id);
        showMessage("✅ Usuário excluído com sucesso!");
      }
      fetchData();
    } catch (error) {
      console.error("❌ Erro ao excluir:", error);
      alert("Erro ao excluir.");
    }
    setConfirmModal({ id: null, multiple: false });
  };

  const handleEdit = (user: User) => {
    setEditUser({ ...user });
  };

  const handleSaveEdit = async () => {
    if (editUser) {
      try {
        await db.users.update(editUser.id!, { ...editUser });
        showMessage("✅ Usuário atualizado com sucesso!");
        fetchData();
        setEditUser(null);
      } catch (error) {
        console.error("❌ Erro ao editar usuário:", error);
        alert("Erro ao editar usuário.");
      }
    }
  };

  const handleAddUser = async () => {
    if (!newUser || !newUser.name.trim() || !newUser.status.trim() || !newUser.agent.trim()) {
      alert("⚠ Todos os campos (Nome, Status e Atendente) devem ser preenchidos!");
      return;
    }
  
    try {
      const users = await db.users.toArray();
      const maxId = users.length > 0 ? Math.max(...users.map((u: User) => u.id || 0)) : 0;
  
      const newUserData: User = {
        id: maxId + 1,
        name: newUser.name.trim(),
        status: newUser.status.trim(),
        agent: newUser.agent.trim(),
        creationDate: new Date().toISOString(),
      };
    // console.log("add:", newUserData);
      await db.users.add(newUserData);
      setNewUser(null);
      showMessage("✅ Usuário adicionado com sucesso!");
      fetchData();
    } catch (error) {
      console.error("❌ Erro ao adicionar usuário:", error);
      alert("Erro ao adicionar usuário.");
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter((user) => {
    const value = user[filterColumn as keyof User];
    if (filterColumn === "id") {
      return value && String(value).includes(filterValue);
    }
    return value && String(value).toLowerCase().includes(filterValue.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const ConfirmModal = ({ message, onConfirm, onCancel }: {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => (
    <Modal onClose={onCancel}>
        <ModalTitle>Confirmação</ModalTitle>
        <p>{message}</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <DeleteButton onClick={onConfirm}>Confirmar</DeleteButton>
          <EditButton onClick={onCancel}>Cancelar</EditButton>
        </div>
    </Modal>
  );

  return (
    <Container>
      {message && <Message>{message}</Message>}

      <AddButton onClick={() => setNewUser({ name: "", status: "Ativo", agent: "Atendente" })}>
        ➕ Adicionar Novo
      </AddButton>

      <FilterContainer>
        <Select value={filterColumn} onChange={handleFilterColumnChange}>
          <option value="id">ID</option>
          <option value="name">Nome</option>
          <option value="status">Status</option>
          <option value="agent">Atendente (Função)</option>
          <option value="creationDate">Data de Criação</option>
        </Select>

        <Input
          type={filterColumn === "id" ? "number" : "text"}
          placeholder={`Filtrar por ${filterColumn}...`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </FilterContainer>

      {paginatedData.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Nenhum usuário encontrado.</p>
      ) : (
        <>
          <TableContainer>
            <StyledTable>
              <TableHeader>
                <TableRow>
                  <TableCell>
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (selectedIds.length === paginatedData.length) {
                          setSelectedIds([]);
                        } else {
                          setSelectedIds(paginatedData.map((user) => user.id!));
                        }
                      }}
                      checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Função</TableCell>
                  <TableCell>Data de Criação</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {paginatedData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user.id!)}
                        onChange={() => toggleSelection(user.id!)}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.agent}</TableCell>
                    <TableCell>{new Date(user.creationDate).toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <EditButton onClick={() => handleEdit(user)}>✎</EditButton>
                      <ViewButton onClick={() => setViewUser(user)}>🔎</ViewButton>
                      <DeleteButton onClick={() => handleDeleteUser(user.id!)}>🗑</DeleteButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>

          {selectedIds.length > 0 && (
            <DeleteSelectedButton onClick={handleDeleteSelected}>
              🗑 Excluir Selecionados ({selectedIds.length})
            </DeleteSelectedButton>
          )}

          <PaginationContainer>
            <PaginationButton onClick={() => setPage(1)} disabled={page === 1}>
              ↞ Primeira
            </PaginationButton>
            <PaginationButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              ⇠ Anterior
            </PaginationButton>
            <span> Página {page} de {totalPages} </span>
            <PaginationButton onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Próxima ⇢
            </PaginationButton>
            <PaginationButton onClick={() => setPage(totalPages)} disabled={page === totalPages}>
              ↠ Última
            </PaginationButton>
          </PaginationContainer>
        </>
      )}

      {(confirmModal.id !== null || confirmModal.multiple) && (
        <ConfirmModal
          message={
            confirmModal.multiple
              ? `Tem certeza que deseja excluir ${selectedIds.length} usuário(s)?`
              : "Tem certeza que deseja excluir este usuário?"
          }
          onConfirm={confirmDelete}
          onCancel={() => setConfirmModal({ id: null, multiple: false })}
        />
      )}

      {viewUser && (
        <Modal onClose={() => setViewUser(null)}>
            <ModalTitle>Detalhes do Usuário</ModalTitle>
            <p><strong>ID:</strong> {viewUser.id}</p>
            <p><strong>Nome:</strong> {viewUser.name}</p>
            <p><strong>Status:</strong> {viewUser.status}</p>
            <p><strong>Atendente:</strong> {viewUser.agent}</p>
            <p><strong>Data de Criação:</strong> {new Date(viewUser.creationDate).toLocaleString('pt-BR')}</p>
        </Modal>
      )}

      {editUser && (
        <Modal onClose={() => setEditUser(null)}>
            <ModalTitle>Editar Usuário</ModalTitle>
            <StyledInput
              type="text"
              placeholder="Nome"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
            <StyledInput
              type="text"
              placeholder="Status"
              value={editUser.status}
              onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
            />
            <StyledInput
              type="text"
              placeholder="Atendente"
              value={editUser.agent}
              onChange={(e) => setEditUser({ ...editUser, agent: e.target.value })}
            />
            <SaveButton onClick={handleSaveEdit}>Salvar Alterações</SaveButton>
        </Modal>
      )}

      {newUser && (
        <Modal onClose={() => setNewUser(null)}>
            <ModalTitle>Adicionar Novo Usuário</ModalTitle>
            <StyledInput
              type="text"
              placeholder="Nome"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <StyledInput
              type="text"
              placeholder="Status"
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            />
            <StyledInput
              type="text"
              placeholder="Atendente"
              value={newUser.agent}
              onChange={(e) => setNewUser({ ...newUser, agent: e.target.value })}
            />
            <SaveButton onClick={handleAddUser}>Salvar Usuário</SaveButton>
        </Modal>
      )}
    </Container>
  );
}