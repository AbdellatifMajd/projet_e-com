import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import ProductImageUpload from "./ProductImageUpload";
import CommonForm from "@/common/CommonForm";
import { addProductFormElements } from "@/config";
import { useDispatch } from "react-redux";
import { addNewProduct } from "@/store/AdminProductSlice";

function AddNewProductForm({ open, onClose }) {
  const dispatch = useDispatch();

  const initialState = {
    image: null,
    title: "",
    description: "",
    price: "",
    salePrice: "",
    totalStock: 0,
  };

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const onSubmit = () => {
    dispatch(addNewProduct());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>


      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 3 }}>
        <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} />

        <CommonForm
          formControls={addProductFormElements}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={"Save product"}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddNewProductForm;