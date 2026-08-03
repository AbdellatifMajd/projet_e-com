import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toggleFavorites } from "@/store/ShopProductSlice";

function ShopProductDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productList, favorites, isLoading } = useSelector(
    (state) => state.shopProduct,
  );

  // On cherche le produit dans la liste déjà chargée en store.
  // Si productList est vide au premier chargement direct de l'URL,
  // il faudra dispatcher une action de fetch par id (voir note en bas).
  const product = productList?.find((p) => String(p.id) === String(id));

  const favorite = favorites?.includes(product?.id);

  const outOfStock = product?.totalStock === 0;
  const onSale = product?.salePrice > 0;

  const handleToggleFavorites = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorites(product.id));
  };

  const handleAddToCart = () => {
    // À relier à ton action addToCart existante
    console.log("Add to cart:", product?.id);
  };

  let badge = null;
  if (outOfStock) {
    badge = { label: "Out of stock", color: "#ef4444" };
  } else if (product?.totalStock < 10) {
    badge = { label: `Only ${product?.totalStock} left in stock`, color: "#f97316" };
  } else if (onSale) {
    badge = { label: "Sale", color: "#10b981" };
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          gap: 2,
        }}
      >
        <Typography variant="h6">Produit introuvable</Typography>
        <Button variant="outlined" onClick={() => navigate("/shop/home")}>
          Back to shop
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, textTransform: "none" }}
      >
        Back
      </Button>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            height: { xs: 320, md: 480 },
          }}
        >
          <Box
            component="img"
            src={product?.imageUrl}
            alt={product?.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {badge && (
            <Chip
              label={badge.label}
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                bgcolor: badge.color,
                color: "#fff",
                fontWeight: 600,
              }}
            />
          )}

          <IconButton
            onClick={handleToggleFavorites}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            {favorite ? (
              <FavoriteIcon sx={{ fontSize: 20, color: "#ef4444" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 20, color: "#374151" }} />
            )}
          </IconButton>
        </Box>

        {/* Infos produit */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {product?.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant={onSale ? "h6" : "h5"}
              sx={{
                fontWeight: 700,
                color: onSale ? "text.secondary" : "primary.main",
                textDecoration: onSale ? "line-through" : "none",
              }}
            >
              ${product?.price}
            </Typography>
            {onSale && (
              <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
                ${product?.salePrice}
              </Typography>
            )}
          </Box>

          {product?.description && (
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
              {product.description}
            </Typography>
          )}

          <Button
            variant="contained"
            disableElevation
            disabled={outOfStock}
            onClick={handleAddToCart}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.3,
              mt: 2,
            }}
          >
            {outOfStock ? "Out of stock" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ShopProductDetails;