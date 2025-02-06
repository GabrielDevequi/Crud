import styled from "styled-components";

// Cores do tema
const colors = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
  light: "#f8f9fa",
  dark: "##d18f42",
  white: "#fff",
};

// Container principal
export const Container = styled.div`
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;



// Mensagem de feedback
export const Message = styled.p`
  background-color: ${colors.success};
  padding: 10px;
  border-radius: 8px;
  color: ${colors.white};
  margin-bottom: 20px;
  text-align: center;
  transition: background-color 0.3s ease;
`;

// Botão de adicionar
export const AddButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.success};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;




// Título do Modal
export const ModalTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 22px;
  color: ${colors.dark};
`;

// Input estilizado
export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${colors.secondary};
  margin-bottom: 12px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
  }
`;

// Botão de salvar no Modal
export const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${colors.primary};
  color: ${colors.white};
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;



// Container dos filtros
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Select para escolher a coluna de filtro
export const Select = styled.select`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.secondary};
  background-color: ${colors.white};
  color: ${colors.dark};
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

// Input para o valor do filtro
export const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.secondary};
  background-color: ${colors.white};
  color: ${colors.dark};
  font-size: 14px;
  flex: 1;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

// Container da tabela
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(28, 115, 214, 0.54);
  border-radius: 8px;

  @media (max-width: 768px) {
    overflow-x: scroll;
  }
`;

// Estilo da tabela
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


// Cabeçalho da tabela
export const TableHeader = styled.thead`
  background-color: ${colors.primary};
  color: ${colors.white};
`;

// Linha da tabela
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.light};
  }
  tbody &:hover {
    background-color: #e9ecef;
  }
`;

// Célula da tabela
export const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

// Botão de editar
export const EditButton = styled.button`
  padding: 8px 12px;
  background-color: ${colors.warning};
  color: ${colors.dark};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e0a800;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

// Botão de visualizar
export const ViewButton = styled.button`
  padding: 8px 12px;
  background-color: ${colors.info};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #138496;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

// Botão de excluir
export const DeleteButton = styled.button`
  padding: 8px 12px;
  background-color: ${colors.danger};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

// Container da paginação
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

// Botão de paginação
export const PaginationButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: ${colors.primary};
  color: ${colors.white};
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${colors.secondary};
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

// Botão de exclusão múltipla
export const DeleteSelectedButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.danger};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
