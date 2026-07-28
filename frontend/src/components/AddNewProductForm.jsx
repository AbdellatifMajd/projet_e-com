import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import ProductImageUpload from "./ProductImageUpload";
import CommonForm from "@/common/CommonForm";
import { addProductFormElements } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllAdminProducts, uploadImageToCloudinary } from "@/store/AdminProductSlice";

function AddNewProductForm({ open, onClose }) {
  const dispatch = useDispatch();
  const { imageLoading, uploadedImageUrl } = useSelector((state) => state.adminProduct);

  const initialState = {
    title: "",
    description: "",
    price: "",
    discount: "",
    totalStock: 0,
  };

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState(initialState);

const onSubmit = (e) => {
  e.preventDefault();
  if (imageLoading) return;

  dispatch(uploadImageToCloudinary(imageFile))
    .unwrap()
    .then(() => {
      return dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).unwrap();
    })
    .then(() => {
      dispatch(fetchAllAdminProducts());
      setFormData(initialState);
      setImageFile(null);
      onClose();
    })
    .catch((error) => {
      console.error("Failed to upload image or add new product:", error);
    });
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
          buttonText={imageLoading ? "Uploading image..." : "Save product"}
          isBtnDisabled={imageLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddNewProductForm;