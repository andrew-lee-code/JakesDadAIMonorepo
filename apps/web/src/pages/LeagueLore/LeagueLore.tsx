import { Box, Typography, Grid } from "@jakes-dad/shared";
import ArtifactCard from "../../components/ArtifactCard";
import LeagueTimeline from "../../components/LeagueTimeline";

interface Artifact {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[]; // Array of images for carousel
  link?: string;
  gradientColors?: {
    start: string;
    end: string;
  };
  type?: "image" | "link" | "modal";
  modalContent?: string;
}

const LeagueLore = () => {
  const artifacts: Artifact[] = [
    {
      id: "commish-jihad",
      title: "Commmish Authoritarianism",
      description: "The Commmish shows his true colors",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/commish_jihad.jpeg",
      ],
      gradientColors: {
        start: "#DC2626",
        end: "#EF4444",
      },
      type: "modal",
      modalContent:
        "After facing resistance from the league on new policy regarding IR eligibility, the commish crashes out and threatens jihad on the league bottomfeeders.",
    },
    {
      id: "nashville-draft",
      title: "Nashville Draft 2025",
      description: "The league meets in Nashville for the 2025 draft",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/michael_duck.jpeg",
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/pickle.jpeg",
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/broadway.jpeg",
        // Add more images here for demonstration
      ],
      gradientColors: {
        start: "#DC2626",
        end: "#EF4444",
      },
      type: "modal",
      modalContent: "",
    },
    {
      id: "taylors-cup-pong",
      title: "Taylor's Cup Pong Rant",
      description: "A legendary Taylor bitch rant",
      imageUrl: "https://i.ytimg.com/vi/nPrw45262Pc/mqdefault.jpg",
      gradientColors: {
        start: "#DC2626",
        end: "#EF4444",
      },
      type: "modal",
      modalContent:
        "\"I'm not doing this again next year. I said it last year but I swear if we ever use this dumbass boring way to decide draft order again and I start at a disadvantage like I do every year I'm not playing fantasy again. This is the last fucking time we do this\"",
    },
    {
      id: "hayride-debacle",
      title: "The Great Hayride Debacle",
      description: "Let that shittake go",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/hayride.JPG",
        // Add more images here for demonstration
      ],
      gradientColors: {
        start: "#DC2626",
        end: "#EF4444",
      },
      type: "modal",
      modalContent:
        "Andrew went on a hayride in 2023 and missed a lineup sub, causing a nuclear league controversy. As a result of this bad juju, his season derailed and he finished last",
    },
    {
      id: "taylors-poetry",
      title: "Taylor's Poetry",
      description: "Once upon a midnight dreary...",
      imageUrl: "https://locations.wafflehouse.com/wafflehouse-clipped.png",
      link: "https://docs.google.com/document/d/1w2XXYlYc8f8RM6iw21Rq24vsVTMHzOaL/edit?usp=sharing&ouid=116329817765220727572&rtpof=true&sd=true",
      gradientColors: {
        start: "#155263",
        end: "#2798b7",
      },
      type: "link",
    },
    {
      id: "febreezy-comeback",
      title: "The Miracle on Alhambra Street",
      description: "Matt's historic Monday night comeback",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/febreezy_comeback.png",
      ],
      gradientColors: {
        start: "#DC2626",
        end: "#EF4444",
      },
      type: "modal",
      modalContent:
        "In Week 6 of 2018, Matt entered Monday night down 95.3 points with four players left. The duo of Aaron Rodgers and Davante Adams combined for 53.6. Marquise Goodwin added 25.1. And Mason Crosby hit a FG as time expired to give him 17 points and a Febreezy buzzer beating stunner.",
    },
    {
      id: "gronny-trashtalk",
      title: "Michael Berates Gronny on Accident",
      description: "Michael sends trash talk intended for Matt to Gronny.",
      imageUrls: [
        "https://ywawkcmujzqlaywudoda.supabase.co/storage/v1/object/public/jakes_dad_public_assets/gronny.PNG",
      ],
      gradientColors: {
        start: "#DC2626",
        end: "#EF4444",
      },
      type: "modal",
      modalContent:
        "In 2015, Michael swept the Johnson brothers and decided to talk a little smack. He asks Andrew for Matt's number but Andrew coyly gives him Gronny's number instead. Michael identifies himself in the text and tells them both to suck his fat Jewish cock",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: 4,
        maxWidth: "100%",
        minHeight: "100vh",
        backgroundColor: "#e6e6e6",
        background: "linear-gradient(135deg, #e6e6e6 0%, #ffffff 100%)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 700,
          color: "#155263",
          textShadow: "0 2px 4px rgba(21, 82, 99, 0.1)",
        }}
      >
        League Lore
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mb: 6,
          color: "#666",
          fontStyle: "italic",
          fontSize: "1.1rem",
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        Explore the rich history and memorable moments of Jake's Dad
      </Typography>

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* League Timeline Section */}
        <LeagueTimeline />

        {/* Historical Artifacts Section */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: 600,
            color: "#155263",
            textShadow: "0 2px 4px rgba(21, 82, 99, 0.1)",
          }}
        >
          Documents & Artifacts
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {artifacts.map((artifact) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={artifact.id}>
              <ArtifactCard
                title={artifact.title}
                description={artifact.description}
                imageUrl={artifact.imageUrl}
                imageUrls={artifact.imageUrls}
                link={artifact.link}
                gradientColors={artifact.gradientColors}
                type={artifact.type}
                modalContent={artifact.modalContent}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LeagueLore;
