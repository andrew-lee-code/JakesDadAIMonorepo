import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Chip,
} from "@jakes-dad/shared";
import { ChevronLeft, ChevronRight } from "@jakes-dad/shared";
import { useState } from "react";

interface ArtifactCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  link?: string;
  type?: "link" | "modal";
  modalContent?: string;
  year: number;
}

const ArtifactCard = ({
  title,
  description,
  imageUrl,
  imageUrls,
  link,
  type = "modal",
  modalContent,
  year,
}: ArtifactCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    imageUrls && imageUrls.length > 0 ? imageUrls : imageUrl ? [imageUrl] : [];
  const displayImage = images.length > 0 ? images[0] : undefined;
  const hasMultipleImages = images.length > 1;

  const handleCardClick = () => {
    if (type === "link" && link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      setModalOpen(true);
      setCurrentImageIndex(0);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 3,
          border: "2px solid #e0e0e0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            borderColor: "#155263",
          },
        }}
      >
        <CardActionArea onClick={handleCardClick} sx={{ height: "100%" }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="div"
              sx={{
                height: 180,
                backgroundColor: displayImage ? "transparent" : "#155263",
                backgroundImage: displayImage ? `url(${displayImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Year chip */}
            <Chip
              label={year}
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                backgroundColor: "#155263",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 700,
                height: 26,
              }}
            />
            {/* Photo count indicator */}
            {hasMultipleImages && (
              <Chip
                label={`${images.length} photos`}
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  fontSize: "11px",
                  height: 24,
                }}
              />
            )}
            {/* External link indicator */}
            {type === "link" && (
              <Chip
                label="External link"
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  fontSize: "11px",
                  height: 24,
                }}
              />
            )}
          </Box>
          <CardContent sx={{ p: 2.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#155263",
                fontSize: "16px",
                mb: 0.5,
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "13px",
                lineHeight: 1.4,
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Modal Dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#155263",
            textAlign: "center",
            pb: 1,
          }}
        >
          {title}
          <Typography
            component="span"
            sx={{
              ml: 2,
              fontSize: "14px",
              color: "#666",
              fontWeight: 400,
            }}
          >
            {year}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Image Carousel */}
          {images.length > 0 && (
            <Box sx={{ position: "relative", mb: 3 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />

                {/* Navigation arrows - only show if more than one image */}
                {images.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevImage}
                      sx={{
                        position: "absolute",
                        left: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <IconButton
                      onClick={handleNextImage}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}
              </Box>

              {/* Image indicators - only show if more than one image */}
              {images.length > 1 && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    {images.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor:
                            index === currentImageIndex ? "#155263" : "#ccc",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            backgroundColor:
                              index === currentImageIndex ? "#155263" : "#999",
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {/* Image counter */}
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "center",
                      mt: 1,
                      color: "#666",
                    }}
                  >
                    {currentImageIndex + 1} / {images.length}
                  </Typography>
                </>
              )}
            </Box>
          )}

          {/* Text content */}
          {modalContent && (
            <Typography
              variant="body1"
              sx={{
                color: "#333",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              {modalContent}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pt: 2 }}>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: "#155263",
              "&:hover": {
                backgroundColor: "#2798b7",
              },
              borderRadius: 2,
              px: 4,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ArtifactCard;
