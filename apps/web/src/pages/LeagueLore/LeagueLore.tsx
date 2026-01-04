import { Box, Typography } from "@jakes-dad/shared";
import ArtifactCard from "../../components/ArtifactCard";
import LeagueTimeline from "../../components/LeagueTimeline";

interface Artifact {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  link?: string;
  type?: "link" | "modal";
  modalContent?: string;
  year: number;
}

const LeagueLore = () => {
  // Artifacts sorted chronologically (newest first)
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
      modalContent:
        "The boys descend on Nashville for an unforgettable draft weekend.",
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
        "\"I'm not doing this again next year. I said it last year but I swear if we ever use this dumbass boring way to decide draft order again and I start at a disadvantage like I do every year I'm not playing fantasy again. This is the last fucking time we do this\"",
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
          px: { xs: 3, md: 4 },
          py: 4,
        }}
      >
        {/* League Timeline Section */}
        <LeagueTimeline />

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
            <ArtifactCard
              key={artifact.id}
              title={artifact.title}
              description={artifact.description}
              imageUrl={artifact.imageUrl}
              imageUrls={artifact.imageUrls}
              link={artifact.link}
              type={artifact.type}
              modalContent={artifact.modalContent}
              year={artifact.year}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LeagueLore;
