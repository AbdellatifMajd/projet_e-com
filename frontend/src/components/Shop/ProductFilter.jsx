// ProductFilter.jsx
import { Fragment } from "react";
import { filterOptions } from "@/config";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function ProductFilter({ filters, handleFilter, handleClearFilters }) {
  const activeCount = filters
    ? Object.values(filters).reduce((sum, arr) => sum + (arr?.length ?? 0), 0)
    : 0;

  return (
    <Card className="border shadow-sm md:sticky md:top-6 md:h-[calc(100vh-3rem)] md:overflow-y-auto">
      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold">Filtres</h3>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-auto py-1 px-2 text-muted-foreground"
            onClick={handleClearFilters}
          >
            Effacer ({activeCount})
          </Button>
        )}
      </div>

      <div className="px-4 pb-4 space-y-5">
        {Object.keys(filterOptions).map((keyItem, idx) => (
          <Fragment key={keyItem}>
            {idx > 0 && <Separator />}
            <div>
              <h4 className="text-sm font-medium mb-2 capitalize">{keyItem}</h4>
              <div className="grid gap-2">
                {filterOptions[keyItem].map((option) => {
                  const checked =
                    filters?.[keyItem]?.indexOf(option.id) > -1 ?? false;
                  return (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground text-muted-foreground"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </Card>
  );
}

export default ProductFilter;