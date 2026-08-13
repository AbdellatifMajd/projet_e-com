import React from "react";
import { Button, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";

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

    case "select":
      return (
        <Select
          value={value}
          onChange={(e) =>{
            console.log("Selected:", e.target.value);
            setFormData({
              ...formData,
              [item.name]: e.target.value,
            })}
          }
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            {item.label}
          </MenuItem>

          {item.options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
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
  isBtnDisabled
}) {
  return (
    <form onSubmit={onSubmit} className="w-full mx-auto">
      <div className="space-y-4 mb-6 w-full mt-3">
        {formControls.map((item) => (
          <div key={item.id || item.name} className="w-full">
            {renderInputsByComponentType(item, formData, setFormData)}
          </div>
        ))}
      </div>

      <Button
      disabled={isBtnDisabled}
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
