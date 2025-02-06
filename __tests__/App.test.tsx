import React from "react"; 
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Verifica se o texto aparece na tela", () => {
  render(<h1>Teste Jest</h1>);
  expect(screen.getByText("Teste Jest")).toBeInTheDocument();
});
