import React from "react";
import { Button, TextareaAutosize, TextField } from "@mui/material";

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
          onChange={(e) =>
            setFormData({
              ...formData,
              [item.name]: e.target.value,
            })
          }
          fullWidth
        />
      );

    case "textarea":
  return (
    <TextField
      variant="outlined"
      label={item.label}
      value={value}
      onChange={(e) =>
        setFormData({
          ...formData,
          [item.name]: e.target.value,
        })
      }
      multiline
      rows={4}
      fullWidth
    />
  );

    default:
      return null;
  }
};

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  return (
    <form onSubmit={onSubmit} className="w-full mx-auto">
      <div className="space-y-4 mb-6 w-full">
        {formControls.map((item) => (
          <div key={item.id || item.name} className="w-full">
            {renderInputsByComponentType(item, formData, setFormData)}
          </div>
        ))}
      </div>

      <Button
        variant="contained"
        type="submit"
        size="large"
        fullWidth
        sx={{ py: 1.5, px: 2 }}
      >
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
