

// ShopHome.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductFilter from "@/components/Shop/ProductFilter";
import ShoppingProductTile from "@/components/Shop/ProductTile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/ShopProductSlice";
import { ArrowUpDownIcon } from "lucide-react";

function ShopHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, isLoading } = useSelector((state) => state.shopProduct);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(sortOptions?.[0]?.id ?? "");

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, filters, sort]);

  function handleFilter(sectionKey, optionId) {
    setFilters((prev) => {
      const current = prev[sectionKey] ? [...prev[sectionKey]] : [];
      const index = current.indexOf(optionId);
      if (index > -1) current.splice(index, 1);
      else current.push(optionId);
      return { ...prev, [sectionKey]: current };
    });
  }

  function handleClearFilters() {
    setFilters({});
  }

  function handleGetProductDetails(productId) {
    navigate(`/shop/product/${productId}`);
  }

  function handleAddToCart(productId, totalStock) {
    if (totalStock <= 0) return;
    // TODO: brancher sur votre thunk du panier, ex:
    // dispatch(addToCart({ productId, quantity: 1 }));
  }

  const sortLabel = useMemo(
    () => sortOptions.find((s) => s.id === sort)?.label ?? "Trier",
    [sort]
  );

  return (
    <div className=" mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
      <ProductFilter
        filters={filters}
        handleFilter={handleFilter}
        handleClearFilters={handleClearFilters}
      />

      <Card className="w-full border-0 shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Tous les produits</h2>
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Chargement…" : `${productList?.length ?? 0} produit${(productList?.length ?? 0) > 1 ? "s" : ""}`}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowUpDownIcon className="h-4 w-4" />
                {sortLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

<div className="p-5">
  {isLoading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[380px] rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  ) : productList && productList.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {productList.map((productItem) => (
        <ShoppingProductTile
          key={productItem.id}
          product={productItem}
          handleGetProductDetails={handleGetProductDetails}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-base font-medium">Aucun produit trouvé</p>
      <p className="text-sm text-muted-foreground mt-1">
        Essayez de modifier vos filtres.
      </p>
    </div>
  )}
</div>
      </Card>
    </div>
  );
}


export default ShopHome;
