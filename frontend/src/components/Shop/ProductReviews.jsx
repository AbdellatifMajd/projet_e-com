import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";

function ProductReviews({
  avgRating,
  reviewCount,
  reviews,
  canReview,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    // Hook this up to your existing addReview action
    console.log("New review:", { rating: newRating, comment: newComment });
    setOpenDialog(false);
    setNewRating(0);
    setNewComment("");
  };

  return (
    <Box sx={{ mt: 6 }} id="reviews">
      {/* Summary header */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            Customer Reviews
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={avgRating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {avgRating.toFixed(1)} · {reviewCount} reviews
            </Typography>
          </Box>
        </Box>

        {canReview && (
          <Button
            variant="outlined"
            startIcon={<RateReviewIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Write a review
          </Button>
        )}
      </Box>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No reviews yet for this product.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {reviews.map((review) => (
            <Box key={review.id} sx={{ display: "flex", gap: 2 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {review.userName?.[0]?.toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {review.userName}
                  </Typography>
                  {review.verified && (
                    <Typography
                      variant="caption"
                      sx={{ color: "success.main", fontWeight: 600 }}
                    >
                      Verified Purchase
                    </Typography>
                  )}
                </Box>
                <Rating
                  value={review.rating}
                  size="small"
                  readOnly
                  sx={{ mb: 0.5 }}
                />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {review.comment}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  {review.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Write a review dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Write a review</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Your rating
              </Typography>
              <Rating
                value={newRating}
                onChange={(e, value) => setNewRating(value)}
              />
            </Box>
            <TextField
              label="Your comment"
              multiline
              rows={4}
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            disabled={!newRating}
            onClick={handleSubmit}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProductReviews;