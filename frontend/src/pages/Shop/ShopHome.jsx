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
import { fetchAllFilteredProducts, toggleFavorites } from "@/store/ShopProductSlice";
import { ArrowUpDownIcon } from "lucide-react";

function ShopHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, isLoading, favorites} = useSelector((state) => state.shopProduct);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(sortOptions?.[0]?.id ?? "");





  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }),
    );
  }, [dispatch, filters, sort]);

  function handleFilter(sectionKey, optionId) {
    setFilters((prevFilters) => {
      const currentSection = prevFilters[sectionKey] || [];
      const alreadySelected = currentSection.includes(optionId);

      const updatedSection = alreadySelected
        ? currentSection.filter((id) => id !== optionId)
        : [...currentSection, optionId];

      return {
        ...prevFilters,
        [sectionKey]: updatedSection,
      };
    });
  }

  function handleClearFilters() {
    setFilters({});
  }



  const sortLabel = useMemo(
    () => sortOptions.find((s) => s.id === sort)?.label ?? "Sort",
    [sort],
  );

  return (
    <div className=" mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
      <ProductFilter
        filters={filters}
        handleFilter={handleFilter}
        handleClearFilters={handleClearFilters}
      />

      <Card className="w-full">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">All products </h2>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Chargement…"
                : `${productList?.length ?? 0} product${(productList?.length ?? 0) > 1 ? "s" : ""}`}
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
          {productList && productList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id}
                  product={productItem}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-base font-medium">No product found...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Please try to update your filters!
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ShopHome;
