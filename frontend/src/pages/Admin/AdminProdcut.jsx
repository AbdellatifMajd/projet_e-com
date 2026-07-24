import AdminProductTile from "@/components/AdminProductTile";
import { fetchAllAdminProducts } from "@/store/AdminProductSlice";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminProdcut() {
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAdminProducts());
  }, [dispatch]);
  return (
    <>
      <div className="w-full flex justify-end">
        <Button variant="contained"> Add new product </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
          {
           productList&&productList.length>0 ? productList.map((productItem) => (
            <AdminProductTile 
                productItem={productItem}
            />
           )) : null 
          }
        </div>
      
    </>
  );
}

export default AdminProdcut;
