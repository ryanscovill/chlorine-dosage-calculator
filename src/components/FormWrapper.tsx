import React, { useState, useRef } from "react";
import { Container, Button } from "@mui/material";

interface FormWrapperProps {
  children: React.ReactElement;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const [isFormReset, setIsFormReset] = useState(true);
  const formRef = useRef<{ reset: () => void }>(null);

  const handleClear = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Container maxWidth="sm">
      <div style={{ marginBottom: '1em' }}></div>
      {React.cloneElement(children, { ref: formRef, onFormResetChange: setIsFormReset })}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5em', marginTop: '1em' }}>
        {!isFormReset && (
          <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
        )}
      </div>
    </Container>
  );
};

export default FormWrapper;
