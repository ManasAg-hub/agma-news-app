import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme, darkTheme } from "./theme";
import Header from "./components/Header/Header";
import NewsContent from "./components/News/NewsContent";
import { NewsState } from "./Context";
import Footer from "./components/Footer/Footer";
import { Container } from "@mui/system";

export default function App() {
  const { isDark } = NewsState();
  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <CssBaseline>
          <Header />
          <NewsContent />
      </CssBaseline>
    </ThemeProvider>
  );
}
