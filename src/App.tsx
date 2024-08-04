import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import useAppTheme from "./theme";
import FormWrapper from "./components/FormWrapper";
import ChlorineForm from "./components/ChlorineForm";

const App: React.FC = () => {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormWrapper
        title="Chlorine Dosage Calculator">
         <ChlorineForm />
      </FormWrapper>
    </ThemeProvider>
  );
};

export default App;