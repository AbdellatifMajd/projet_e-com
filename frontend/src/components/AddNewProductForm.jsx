import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import ProductImageUpload from "./ProductImageUpload";
import CommonForm from "@/common/CommonForm";
import { addProductFormElements } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  updateProduct,
  fetchAllAdminProducts,
  uploadImageToCloudinary,
} from "@/store/AdminProductSlice";
import { toast } from "sonner";

const initialState = {
  image: "",
  title: "",
  description: "",
  price: 0,
  discount: 0,
  totalStock: 0,
};

function AddNewProductForm({
  open,
  onClose,
  currentEditedId,
  setCurrentEditedId,
}) {
  const dispatch = useDispatch();
  const { imageLoading, productList } = useSelector((state) => state.adminProduct);

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState(initialState);

  // Remplit le formulaire lors du clic sur Edit
  useEffect(() => {
    if (currentEditedId !== null) {
      const productToEdit = productList.find((p) => p.id === currentEditedId);
      if (productToEdit) {
        setFormData({...productToEdit, discount: productToEdit?.salePrice});
      }
    } else {
      setFormData(initialState);
    }
  }, [currentEditedId, productList]);

  const handleClose = () => {
    setFormData(initialState);
    setImageFile(null);
    if (setCurrentEditedId) setCurrentEditedId(null);
    onClose();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (imageLoading) return;

    try {
      let imageUrl = formData.image || "";

      // Si un nouveau fichier est sélectionné, on l'uploade sur Cloudinary
      if (imageFile) {
        const uploadResult = await dispatch(
          uploadImageToCloudinary(imageFile)
        ).unwrap();
        imageUrl = uploadResult?.imageUrl || uploadResult?.result?.url || "";
      }

      const updatedData = { ...formData, image: imageUrl };

      if (currentEditedId !== null) {
        // Mode Modification
        const result = await dispatch(
          updateProduct({ id: currentEditedId, formData: updatedData })
        ).unwrap();
        toast.success(result?.message)
      } else {
        // Mode Création
        const result = await dispatch(addNewProduct(updatedData)).unwrap();
        toast.success(result?.message);
      }

      dispatch(fetchAllAdminProducts());
      handleClose();
    } catch (error) {
      console.error("Failed to add new product :", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <IconButton size="small" onClick={handleClose} dir="right">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
        <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} />

        <CommonForm
          formControls={addProductFormElements}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={
            imageLoading
              ? "uploading..."
              : currentEditedId !== null
              ? "update product"
              : "save product"
          }
          isBtnDisabled={imageLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddNewProductForm;