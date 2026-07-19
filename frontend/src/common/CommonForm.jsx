import React from "react";
import { Button, TextField } from "@mui/material";

const renderInputsByComponentType = (item, formData, setFormData) => {
  const value = formData[item.name] || ""; 

  switch (item.componentType) {
    case "input":
      return (
        <TextField
          variant="outlined"
          label={item.label}
          type={item.type}
          value={value} 
          onChange={(e) => {
            setFormData({
              ...formData,
              [item.name]: e.target.value,
            });
          }}
          fullWidth
        />
      );
    default:
      return null;
  }
};

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
  return (
    <form onSubmit={onSubmit} className="mx-auto">
      <div className="space-y-4 mb-6">
        {formControls.map((item) => (
          <div key={item.id || item.name}>
            {renderInputsByComponentType(item, formData, setFormData)}
          </div>
        ))}
      </div>

      <Button 
        variant="contained" 
        type="submit" 
        size="large"
        sx={{ py: 1.5, px: 2 }}
        fullWidth
      >
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;