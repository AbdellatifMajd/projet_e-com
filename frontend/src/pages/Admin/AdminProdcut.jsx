import AdminProductTile from "@/components/AdminProductTile";
import { fetchAllAdminProducts } from "@/store/AdminProductSlice";
import {
  Button,
  Paper,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewProductForm from "@/components/AddNewProductForm";

function AdminProdcut() {
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllAdminProducts());
  }, [dispatch]);

  //   search bar
  const filteredList = useMemo(() => {
    if (!productList) return [];
    const term = search.trim().toLowerCase();
    if (!term) return productList;

    return productList.filter((p) => {
      const matchesTitle = p.title?.toLowerCase().includes(term);
      const matchesPrice = p.price?.toString().includes(term);
      return matchesTitle || matchesPrice;
    });
  }, [productList, search]);

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2 }}
      >
        <TextField
          placeholder="Search by name or price"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 280, marginRight: "5px" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="disabled" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Add new product
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center" sx={{ width: 100 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList.length > 0 ? (
              filteredList.map((productItem) => (
                <AdminProductTile
                  key={productItem._id}
                  productItem={productItem}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddNewProductForm
        open={openDialog}
        onClose={() => {setOpenDialog(false)}}
      />
    </Paper>
  );
}

export default AdminProdcut;
