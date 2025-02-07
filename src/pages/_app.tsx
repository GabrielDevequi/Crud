import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/global";
import type { AppProps } from "next/app";
import { setupWorker, rest } from "msw";

const lightTheme = {
  colors: {
    primary: "#ffffff",
    secondary: "#f0f0f0",
    text: "#000000",
  },
};

// Definição dos handlers diretamente no _app.tsx
const handlers = [
  rest.get("/api/agentes", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, nome: "Agente 1", status: "Ativo" },
        { id: 2, nome: "Agente 2", status: "Inativo" },
      ])
    );
  }),
];

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const worker = setupWorker(...handlers);
      worker
        .start()
        .then(() => console.log("MSW iniciado!"))
        .catch((err) => console.error("Erro ao iniciar MSW:", err));
    }
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
