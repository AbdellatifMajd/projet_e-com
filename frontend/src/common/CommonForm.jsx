import React from "react";
import { Button, TextField } from "@mui/material";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
  const renderInputsByComponentType = (item) => {
    switch (item.componentType) {
      case "input":
        return (
          <TextField
            variant="outlined"
            label={item.label}
            type={item.type}
            onChange={(e) => {setFormData({...formData, [item.name]: e.target.value})}}
            fullWidth
          />
        );
    }
  };
  return (
    <form onSubmit={onSubmit} className="mx-auto">
      <div className="space-y-4 mb-6">
        {formControls.map((item) => (
          <div key={item.id || item.name}>
            {renderInputsByComponentType(item)}
          </div>
        ))}
      </div>

      <Button 
        variant="contained" 
        type="submit" 
        size="large"
        sx={{py: 1.5, px: 2}}
        fullWidth>
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
