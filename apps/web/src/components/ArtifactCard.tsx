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
} from "@jakes-dad/shared";
import { ChevronLeft, ChevronRight } from "@jakes-dad/shared";
import { useState } from "react";

interface ArtifactCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[]; // Array of images for carousel
  link?: string;
  backgroundColor?: string;
  gradientColors?: {
    start: string;
    end: string;
  };
  type?: "image" | "link" | "modal";
  modalContent?: string;
}

const ArtifactCard = ({
  title,
  description,
  imageUrl,
  imageUrls,
  link,
  backgroundColor = "#155263",
  gradientColors = { start: "#155263", end: "#2798b7" },
  type = "link",
  modalContent,
}: ArtifactCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use imageUrls if provided, otherwise fallback to single imageUrl
  const images =
    imageUrls && imageUrls.length > 0 ? imageUrls : imageUrl ? [imageUrl] : [];
  const displayImage = images.length > 0 ? images[0] : undefined;

  const handleCardClick = () => {
    if (type === "modal") {
      // For modals, open the modal dialog
      setModalOpen(true);
      setCurrentImageIndex(0); // Reset to first image when opening modal
    } else if (link) {
      // For links, open in new tab
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const renderMedia = () => {
    if (displayImage) {
      return (
        <img
          src={displayImage}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      );
    }
    return null;
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(21, 82, 99, 0.15)",
        border: "1px solid #e6e6e6",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 12px 40px rgba(21, 82, 99, 0.25)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundColor: displayImage ? "transparent" : backgroundColor,
            background: displayImage
              ? "none"
              : `linear-gradient(135deg, ${gradientColors.start} 0%, ${gradientColors.end} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {renderMedia()}
        </CardMedia>
        <CardContent
          sx={{
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#155263",
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

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
              )}

              {/* Image counter */}
              {images.length > 1 && (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {currentImageIndex + 1} / {images.length}
                </Typography>
              )}
            </Box>
          )}

          {/* Text content */}
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
    </Card>
  );
};

export default ArtifactCard;
