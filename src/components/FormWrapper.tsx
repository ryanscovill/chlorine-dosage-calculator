import React, { useState, useRef } from "react";
import { Container, Typography, Button } from "@mui/material";

interface FormWrapperProps {
  title: string;
  children: React.ReactElement;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => {
  const [isFormReset, setIsFormReset] = useState(true);
  const formRef = useRef<{ reset: () => void }>(null);

  const handleClear = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5em', marginTop: '0.5em' }}>
        <Typography variant="h4">{title}</Typography>
        {!isFormReset && (
          <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
        )}
      </div>
      {React.cloneElement(children, { ref: formRef, onFormResetChange: setIsFormReset })}
    </Container>
  );
};

export default FormWrapper;
