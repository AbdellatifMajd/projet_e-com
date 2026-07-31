import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchAllAdminProducts,
} from "@/store/AdminProductSlice";
import { toast } from "sonner";

function AdminProductTile({ productItem, setOpenDialog, setCurrentEditedId }) {
  const dispatch = useDispatch();

  const isOutOfStock = productItem.totalStock === 0;
  const isLowStock = productItem.totalStock > 0 && productItem.totalStock <= 20;

  const stockColor = isOutOfStock
    ? "error"
    : isLowStock
      ? "warning"
      : "text.secondary";

  const handleEditProduct = (id) => {
    setCurrentEditedId(id);
    setOpenDialog(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await dispatch(deleteProduct(id)).unwrap();
      toast.success(response.message);
      dispatch(fetchAllAdminProducts());
    } catch (error) {
      toast.error(error?.message)
    }
  };

  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            src={productItem.image || productItem.imageUrl}
            variant="rounded"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="body2" fontWeight={500}>
            {productItem.title}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="center">
        <Typography
          variant="body2"
          fontWeight={isLowStock || isOutOfStock ? 600 : 400}
          color={stockColor}
        >
          {isOutOfStock ? "Out of stock" : productItem.totalStock}
        </Typography>
      </TableCell>

      <TableCell align="center" sx={{ width: 100 }}>
        <Typography variant="body2" color="text.secondary">
          ${productItem.price}
        </Typography>
      </TableCell>

      <TableCell align="center">
        {productItem.salePrice > 0 ? (
          <Chip
            label={`-${Math.round((1 - productItem.salePrice / productItem.price) * 100)}%`}
            color="success"
            size="small"
          />
        ) : (
          <Typography variant="body2" color="text.disabled">
            —
          </Typography>
        )}
      </TableCell>

      <TableCell align="center" sx={{ width: 100 }}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            size="small"
            onClick={() => {
              handleEditProduct(productItem.id);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              handleDeleteProduct(productItem.id);
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default AdminProductTile;
