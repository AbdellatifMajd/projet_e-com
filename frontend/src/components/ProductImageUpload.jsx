import { Button, Typography, Stack, Box, IconButton } from "@mui/material";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useRef } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

function ProductImageUpload({ imageFile, setImageFile }) {
  const inputRef = useRef(null);

  const handleImgFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <div
        className="border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleImgFileChange}
        />

        {!imageFile ? (
          <label
            htmlFor="upload-image"
            className="flex flex-col items-center justify-center h-36 cursor-pointer text-gray-500 gap-2"
          >
            <UploadCloudIcon className="w-8 h-8" />
            <Typography variant="body2" color="text.secondary">
              Drag & drop or click to upload image
            </Typography>
          </label>
        ) : (
          <Box sx={{ position: "relative", width: "100%", py: 2, px: 2 }}>
            <Stack direction="row" alignItems="center">
              <FileIcon className="w-6 h-6 text-gray-500" />
            </Stack>

            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "50%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {imageFile?.name}
            </Typography>

            <IconButton
              color="error"
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
