import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/global"; 
import type { AppProps } from "next/app";

const lightTheme = {
  colors: {
    primary: "#ffffff",
    secondary: "#f0f0f0",
    text: "#000000",
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
