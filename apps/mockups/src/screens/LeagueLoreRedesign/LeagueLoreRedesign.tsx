import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Chip,
} from "@jakes-dad/shared";
import { ChevronLeft, ChevronRight } from "@jakes-dad/shared";

// Types
interface Artifact {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  link?: string;
  type: "modal" | "link";
  modalContent?: string;
  year: number;
}

// Artifacts in chronological order (newest first)
const artifacts: Artifact[] = [
  {
    id: "nashville-draft",
    title: "Nashville Draft 2025",
    description: "The league meets in Nashville for the 2025 draft",
    imageUrls: [
      "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/michael_duck.jpeg",
      "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/pickle.jpeg",
      "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/broadway.jpeg",
    ],
    type: "modal",
    modalContent: "The boys descend on Nashville for an unforgettable draft weekend.",
    year: 2025,
  },
  {
    id: "commish-jihad",
    title: "Commish Authoritarianism",
    description: "The Commish shows his true colors",
    imageUrls: [
      "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/commish_jihad.jpeg",
    ],
    type: "modal",
    modalContent:
      "After facing resistance from the league on new policy regarding IR eligibility, the commish crashes out and threatens jihad on the league bottomfeeders.",
    year: 2024,
  },
  {
    id: "hayride-debacle",
    title: "The Great Hayride Debacle",
    description: "Let that shittake go",
    imageUrls: [
      "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/hayride.JPG",
    ],
    type: "modal",
    modalContent:
      "Andrew went on a hayride in 2023 and missed a lineup sub, causing a nuclear league controversy. As a result of this bad juju, his season derailed and he finished last.",
    year: 2023,
  },
  {
    id: "taylors-cup-pong",
    title: "Taylor's Cup Pong Rant",
    description: "A legendary Taylor bitch rant",
    imageUrl: "https://i.ytimg.com/vi/nPrw45262Pc/mqdefault.jpg",
    type: "modal",
    modalContent:
      '"I\'m not doing this again next year. I said it last year but I swear if we ever use this dumbass boring way to decide draft order again and I start at a disadvantage like I do every year I\'m not playing fantasy again. This is the last fucking time we do this"',
    year: 2019,
  },
  {
    id: "febreezy-comeback",
    title: "The Miracle on Alhambra Street",
    description: "Matt's historic Monday night comeback",
    imageUrls: [
      "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/febreezy_comeback.png",
    ],
    type: "modal",
    modalContent:
      "In Week 6 of 2018, Matt entered Monday night down 95.3 points with four players left. The duo of Aaron Rodgers and Davante Adams combined for 53.6. Marquise Goodwin added 25.1. And Mason Crosby hit a FG as time expired to give him 17 points and a Febreezy buzzer beating stunner.",
    year: 2018,
  },
  {
    id: "taylors-poetry",
    title: "Taylor's Poetry",
    description: "Once upon a midnight dreary...",
    imageUrl: "https://locations.wafflehouse.com/wafflehouse-clipped.png",
    link: "https://docs.google.com/document/d/1w2XXYlYc8f8RM6iw21Rq24vsVTMHzOaL/edit?usp=sharing&ouid=116329817765220727572&rtpof=true&sd=true",
    type: "link",
    year: 2017,
  },
  {
    id: "gronny-trashtalk",
    title: "Michael Berates Gronny on Accident",
    description: "Michael sends trash talk intended for Matt to Gronny.",
    imageUrls: [
      "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/gronny.PNG",
    ],
    type: "modal",
    modalContent:
      "In 2015, Michael swept the Johnson brothers and decided to talk a little smack. He asks Andrew for Matt's number but Andrew coyly gives him Gronny's number instead. Michael identifies himself in the text and tells them both to suck his fat Jewish cock.",
    year: 2015,
  },
];

// Artifact Card Component
const ArtifactCard = ({ artifact }: { artifact: Artifact }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = artifact.imageUrls || (artifact.imageUrl ? [artifact.imageUrl] : []);
  const displayImage = images[0];
  const hasMultipleImages = images.length > 1;

  const handleClick = () => {
    if (artifact.type === "link" && artifact.link) {
      window.open(artifact.link, "_blank", "noopener,noreferrer");
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
        <CardActionArea onClick={handleClick} sx={{ height: "100%" }}>
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
              label={artifact.year}
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
            {artifact.type === "link" && (
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
              {artifact.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "13px",
                lineHeight: 1.4,
              }}
            >
              {artifact.description}
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
          {artifact.title}
          <Typography
            component="span"
            sx={{
              ml: 2,
              fontSize: "14px",
              color: "#666",
              fontWeight: 400,
            }}
          >
            {artifact.year}
          </Typography>
        </DialogTitle>
        <DialogContent>
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
                  alt={`${artifact.title} - Image ${currentImageIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />

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
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
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
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}
              </Box>

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
                          backgroundColor: index === currentImageIndex ? "#155263" : "#ccc",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                      />
                    ))}
                  </Box>
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

          {artifact.modalContent && (
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
              {artifact.modalContent}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pt: 2 }}>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: "#155263",
              "&:hover": { backgroundColor: "#2798b7" },
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

// Timeline Placeholder (existing component preserved)
const TimelineMockup = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        border: "2px solid #e0e0e0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: 700,
          color: "#155263",
        }}
      >
        League Timeline
      </Typography>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "#666",
          fontStyle: "italic",
        }}
      >
        (Existing LeagueTimeline component - preserved as-is)
      </Typography>
    </Paper>
  );
};

// Main Component
const LeagueLoreRedesign = () => {
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
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 6 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255, 255, 255, 0.03) 35px,
              rgba(255, 255, 255, 0.03) 70px
            )`,
            pointerEvents: "none",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: "32px", md: "48px" },
            mb: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          League Lore
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: { xs: "14px", md: "16px" },
            fontStyle: "italic",
            position: "relative",
            zIndex: 1,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          The history and memorable moments of Jake's Dad
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        {/* Timeline Section */}
        <TimelineMockup />

        {/* Documents & Artifacts Section */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#155263",
            mb: 3,
            textAlign: "center",
          }}
        >
          Documents & Artifacts
        </Typography>

        {/* Artifacts Grid - Chronological Order */}
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
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography
            sx={{
              color: "#666",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            Those who forget the past are doomed to repeat the same dumb trades
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LeagueLoreRedesign;
