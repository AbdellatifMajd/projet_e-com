import { Fragment, useState } from "react";
import { filterOptions } from "@/config";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X } from "lucide-react";

function ProductFilter({ filters, handleFilter, handleClearFilters }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = filters
    ? Object.values(filters).reduce((sum, arr) => sum + (arr?.length ?? 0), 0)
    : 0;

  const filterList = (
    <div className="space-y-5">
      {Object.keys(filterOptions).map((keyItem, idx) => (
        <Fragment key={keyItem}>
          {idx > 0 && <Separator />}
          <div>
            <h4 className="text-sm font-medium mb-2 capitalize">{keyItem}</h4>
            <div className="grid gap-1">
              {filterOptions[keyItem].map((option) => {
                const checked =
                  filters?.[keyItem]?.indexOf(option.id) > -1 ?? false;
                const inputId = `${keyItem}-${option.id}`;

                return (
                  <div
                    key={option.id}
                    className="flex items-center gap-3 py-1.5"
                  >
                    <Checkbox
                      id={inputId}
                      checked={checked}
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={inputId}
                      className="flex-1 cursor-pointer text-[15px] text-foreground select-none"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop — sidebar sticky, inchangé */}
      <Card className="hidden md:block border shadow-sm md:sticky md:top-6 md:h-[calc(100vh-3rem)] md:overflow-y-auto">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Filters</h3>
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-auto py-1 px-2 text-muted-foreground"
              onClick={handleClearFilters}
            >
              Clear ({activeCount})
            </Button>
          )}
        </div>
        <div className="px-4 pb-4">{filterList}</div>
      </Card>

      {/* Mobile — bouton compact qui ouvre un bottom sheet */}
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm active:scale-[0.98] transition"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-1.5 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {filterList}
            </div>

            <div className="flex gap-3 border-t bg-white px-5 py-4">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={handleClearFilters}
                disabled={activeCount === 0}
              >
                Clear all
              </Button>
              <Button
                className="flex-1 rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                Show results
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductFilter;