import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categoryOptionsMap } from "@/config";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  const outOfStock = product?.totalStock === 0;
  const onSale = product?.salePrice > 0;

  return (
    <Card className="group w-full overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200">
      <div
        onClick={() => handleGetProductDetails?.(product?.id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img
            src={product?.imageUrl}
            alt={product?.title}
            className="w-full h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {outOfStock ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">
              Rupture de stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-500">
              Plus que {product?.totalStock} en stock
            </Badge>
          ) : onSale ? (
            <Badge className="absolute top-2 left-2 bg-emerald-500 hover:bg-emerald-500">
              Promo
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
            {categoryOptionsMap[product?.category]}
          </p>
          <h2 className="text-base font-semibold leading-snug line-clamp-2 mb-2">
            {product?.title}
          </h2>
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold ${
                onSale ? "text-muted-foreground line-through text-sm" : "text-primary text-lg"
              }`}
            >
              ${product?.price}
            </span>
            {onSale && (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0">
        <Button
          disabled={outOfStock}
          onClick={() => handleAddToCart?.(product?.id, product?.totalStock)}
          className="w-full"
        >
          {outOfStock ? "Rupture de stock" : "Ajouter au panier"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;