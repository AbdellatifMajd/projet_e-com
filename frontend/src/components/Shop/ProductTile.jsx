import {
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "@/store/ShopProductSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addToCart } from "@/store/ShopCartSlice";
import { toast } from "sonner";

function ShoppingProductTile({ product }) {
  const outOfStock = product?.totalStock === 0;
  const onSale = product?.salePrice > 0;
  const userId = useSelector((state) => state.auth?.user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favorites } = useSelector((state) => state.shopProduct);
  const favorite = favorites.includes(product?.id);

  const handleToggleFavorites = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorites(product.id));
  };
const handleAddToCart = async () => {
  try {
    const data = await dispatch(addToCart({ userId, productId: product?.id })).unwrap();
    toast.success(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};


  let badge = null;
  if (outOfStock) {
    badge = { label: "Out of stock", color: "#ef4444" };
  } else if (product?.totalStock < 10) {
    badge = {
      label: `Only ${product?.totalStock} left in stock`,
      color: "#f97316",
    };
  } else if (onSale) {
    badge = { label: "Sale", color: "#10b981" };
  }

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 3,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/shop/product/${product?.id}`)}
        disableRipple
        sx={{ "&:hover .product-image": { transform: "scale(1.04)" } }}
      >
        <Box sx={{ p: 1.5, pb: 0 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2.5,
              overflow: "hidden",
              height: 240,
            }}
          >
            <Box
              component="img"
              src={product?.imageUrl}
              alt={product?.title}
              className="product-image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                display: "block",
              }}
            />
            {badge && (
              <Chip
                label={badge.label}
                size="small"
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  bgcolor: badge.color,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              />
            )}

            <IconButton
              onClick={handleToggleFavorites}
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              {favorite ? (
                <FavoriteIcon sx={{ fontSize: 18, color: "#ef4444" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 18, color: "#374151" }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ pb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 0.5,
              color: "text.secondary",
              display: "block",
              mb: 0.5,
            }}
          />

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              height: 42,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product?.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Typography
              variant={onSale ? "body2" : "subtitle1"}
              sx={{
                fontWeight: 600,
                color: onSale ? "text.secondary" : "primary.main",
                textDecoration: onSale ? "line-through" : "none",
              }}
            >
              {product?.price} MAD
            </Typography>
            {onSale && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                {product?.salePrice} MAD
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={outOfStock}
          onClick={ handleAddToCart }
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            py: 1,
          }}
        >
          {outOfStock ? "Out of stock" : "Add to cart"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ShoppingProductTile;
