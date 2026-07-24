import { Button, Card, CardContent } from "@mui/material";
import React from "react";

function AdminProductTile({ productItem }) {
  return (
    <Card>
      <div>
        <div className="relative">
          <img
            src={productItem.imageUrl}
            alt={productItem.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h1 className="text-xl font-bold mb-2 mt-2">{productItem.title}</h1>
          <div className="flex flex-col justify-between gap-4 mb-2">
            <div>{productItem.description}</div>
            <span>
              {productItem?.salePrice > 0 ? (
                <span className="text-lg font-bold">${productItem?.salePrice}</span>
              ) : null}
            </span>
          </div>
        </CardContent>

        <footer className="flex justify-end items-center">
            <Button 
            variant="outlined"
            sx={{m: 2}}
            onClick={()=>{

            }}>
                Edit product
            </Button>
        </footer>
      </div>
    </Card>
  );
}

export default AdminProductTile;
