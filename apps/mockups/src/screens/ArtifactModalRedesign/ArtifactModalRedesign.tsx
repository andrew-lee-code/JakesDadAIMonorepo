import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CloseIcon,
  ChevronLeft,
  ChevronRight,
} from "@jakes-dad/shared";
import { useState, useCallback, useEffect, useRef } from "react";

interface ArtifactCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  modalContent?: string;
  year: number;
}

// Custom hook for swipe gesture detection
const useSwipeGesture = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  enabled: boolean
) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (enabled) {
      if (isLeftSwipe) {
        onSwipeLeft();
      } else if (isRightSwipe) {
        onSwipeRight();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [enabled, onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};

const ImprovedArtifactCard = ({
  title,
  description,
  imageUrl,
  imageUrls,
  modalContent,
  year,
}: ArtifactCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    imageUrls && imageUrls.length > 0 ? imageUrls : imageUrl ? [imageUrl] : [];
  const displayImage = images.length > 0 ? images[0] : undefined;
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Swipe gesture handling
  const swipeHandlers = useSwipeGesture(
    handleNextImage,
    handlePrevImage,
    hasMultipleImages && modalOpen
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen || !hasMultipleImages) return;

      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "Escape") {
        setModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, hasMultipleImages, handlePrevImage, handleNextImage]);

  const handleCardClick = () => {
    setModalOpen(true);
    setCurrentImageIndex(0);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Card - unchanged from original */}
      <Card
        elevation={0}
        sx={{
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "2px solid #e0e0e0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)",
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
                color: "#666666",
                fontSize: "13px",
                lineHeight: 1.4,
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Improved Modal Dialog */}
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        maxWidth={false}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.95)",
            },
          },
        }}
      >
        {/* Clickable overlay to close modal */}
        <Box
          onClick={handleClose}
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close button - always visible, top right */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close modal"
            sx={{
              position: "absolute",
              top: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#fff",
              width: 48,
              height: 48,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              },
              "&:focus-visible": {
                outline: "2px solid #155263",
                outlineOffset: 2,
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Main content container - stop propagation to prevent closing */}
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              maxWidth: { xs: "100%", md: "900px" },
              maxHeight: { xs: "100%", md: "85vh" },
              mx: "auto",
              pt: { xs: 8, md: 4 },
              pb: { xs: 4, md: 4 },
              px: { xs: 3, md: 4 },
              overflow: "auto",
            }}
          >
            {/* Header - title and year */}
            <Box
              sx={{
                textAlign: "center",
                flexShrink: 0,
                mb: { xs: 2, md: 3 },
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: { xs: "20px", md: "28px" },
                  mb: 0.5,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: { xs: "14px", md: "16px" },
                }}
              >
                {year}
              </Typography>
            </Box>

            {/* Image carousel area */}
            {images.length > 0 && (
              <DialogContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 0,
                  minHeight: 0,
                  overflow: "visible",
                }}
              >
                {/* Image container with swipe support */}
                <Box
                  {...swipeHandlers}
                  sx={{
                    position: "relative",
                    width: "100%",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: { xs: "8px", md: "12px" },
                    backgroundColor: "#1a1a1a",
                    touchAction: hasMultipleImages ? "pan-y" : "auto",
                    minHeight: { xs: 200, md: 300 },
                  }}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      userSelect: "none",
                    }}
                    draggable={false}
                  />

                  {/* Navigation arrows - larger touch targets on mobile */}
                  {hasMultipleImages && (
                    <>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        aria-label="Previous image"
                        sx={{
                          position: "absolute",
                          left: { xs: 8, md: 16 },
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          width: 48,
                          height: 48,
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                          },
                          "&:focus-visible": {
                            outline: "2px solid #155263",
                            outlineOffset: 2,
                          },
                        }}
                      >
                        <ChevronLeft sx={{ fontSize: { xs: 28, md: 32 } }} />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        aria-label="Next image"
                        sx={{
                          position: "absolute",
                          right: { xs: 8, md: 16 },
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          width: 48,
                          height: 48,
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                          },
                          "&:focus-visible": {
                            outline: "2px solid #155263",
                            outlineOffset: 2,
                          },
                        }}
                      >
                        <ChevronRight sx={{ fontSize: { xs: 28, md: 32 } }} />
                      </IconButton>
                    </>
                  )}
                </Box>

                {/* Image indicators - larger on mobile for touch */}
                {hasMultipleImages && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: { xs: 1.5, md: 1 },
                      mt: 2,
                      flexShrink: 0,
                    }}
                  >
                    {images.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Go to image ${index + 1}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setCurrentImageIndex(index);
                          }
                        }}
                        sx={{
                          width: { xs: 12, md: 10 },
                          height: { xs: 12, md: 10 },
                          borderRadius: "50%",
                          backgroundColor:
                            index === currentImageIndex
                              ? "#fff"
                              : "rgba(255, 255, 255, 0.4)",
                          cursor: "pointer",
                          transition: "all 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)",
                          padding: { xs: 1, md: 0.5 },
                          margin: { xs: -1, md: -0.5 },
                          boxSizing: "content-box",
                          "&:hover": {
                            backgroundColor:
                              index === currentImageIndex
                                ? "#fff"
                                : "rgba(255, 255, 255, 0.7)",
                          },
                          "&:focus-visible": {
                            outline: "2px solid #155263",
                            outlineOffset: 2,
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}

                {/* Image counter */}
                {hasMultipleImages && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      mt: 1,
                      fontSize: { xs: "12px", md: "14px" },
                    }}
                  >
                    {currentImageIndex + 1} / {images.length}
                  </Typography>
                )}

                {/* Swipe hint - only on mobile, only for multi-image */}
                {hasMultipleImages && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: { xs: "block", md: "none" },
                      color: "rgba(255, 255, 255, 0.4)",
                      mt: 0.5,
                      fontSize: "11px",
                    }}
                  >
                    Swipe to navigate
                  </Typography>
                )}
              </DialogContent>
            )}

            {/* Modal content text */}
            {modalContent && (
              <Box
                sx={{
                  pt: { xs: 3, md: 3 },
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: { xs: "15px", md: "17px" },
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    maxWidth: "600px",
                    mx: "auto",
                  }}
                >
                  {modalContent}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

// Demo page showcasing the improved modal
export const ArtifactModalRedesign = () => {
  const sampleArtifacts: ArtifactCardProps[] = [
    {
      title: "Nashville Draft 2025",
      description: "The league meets in Nashville for the 2025 draft",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/michael_duck.jpeg",
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/pickle.jpeg",
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/broadway.jpeg",
      ],
      modalContent:
        "The boys descend on Nashville for an unforgettable draft weekend.",
      year: 2025,
    },
    {
      title: "Commish Authoritarianism",
      description: "The Commish shows his true colors",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/commish_jihad.jpeg",
      ],
      modalContent:
        "After facing resistance from the league on new policy regarding IR eligibility, the commish crashes out and threatens jihad on the league bottomfeeders.",
      year: 2024,
    },
    {
      title: "The Great Hayride Debacle",
      description: "Let that shittake go",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/hayride.JPG",
      ],
      modalContent:
        "Andrew went on a hayride in 2023 and missed a lineup sub, causing a nuclear league controversy.",
      year: 2023,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
          px: { xs: 3, md: 4 },
          py: { xs: 4, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: "28px", md: "36px" },
            mb: 1,
          }}
        >
          Artifact Modal Redesign
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Click a card to see the improved modal. Try swiping on mobile!
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 3, md: 4 },
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {sampleArtifacts.map((artifact) => (
            <ImprovedArtifactCard key={artifact.title} {...artifact} />
          ))}
        </Box>

        {/* Design notes */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#155263", fontWeight: 700, mb: 2 }}
          >
            Design Improvements
          </Typography>
          <Box component="ul" sx={{ color: "#666", pl: 2, m: 0 }}>
            <li>Fullscreen modal on mobile for maximum image viewing</li>
            <li>Dark overlay background for better image focus</li>
            <li>Swipe gestures for photo navigation on touch devices</li>
            <li>Keyboard navigation (arrow keys + Escape)</li>
            <li>48px touch targets for arrows and close button</li>
            <li>Responsive spacing using design system tokens</li>
            <li>Dynamic image sizing (no fixed height)</li>
            <li>Close button always visible in top-right corner</li>
            <li>Click outside image to close modal</li>
            <li>Proper mobile padding to prevent content cutoff</li>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ArtifactModalRedesign;
