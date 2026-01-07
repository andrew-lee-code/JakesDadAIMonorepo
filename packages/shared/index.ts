// Export theme
export { theme } from './theme';

// Export database types
export type * from './types';

// Re-export MUI Material components
// This ensures all apps use the same MUI version from the shared package
export {
  // Layout
  Box,
  Container,
  Grid,
  Stack,
  // Typography
  Typography,
  // Inputs
  Button,
  TextField,
  IconButton,
  Switch,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  // Surfaces
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Feedback
  Alert,
  CircularProgress,
  // Navigation
  Drawer,
  Menu,
  // Data Display
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// Re-export MUI hooks
export { useTheme, useMediaQuery } from '@mui/material';

// Re-export MUI System (for styling)
export type { SxProps } from '@mui/system';

// Re-export MUI Styles
export {
  ThemeProvider,
  createTheme,
  styled,
} from '@mui/material/styles';
export { default as CssBaseline } from '@mui/material/CssBaseline';

// Re-export MUI Lab components
export {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';

// Re-export MUI Icons
export {
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Handyman as HandymanIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Museum as MuseumIcon,
  Analytics as AnalyticsIcon,
  EmojiEvents as EmojiEventsIcon,
  BarChart as BarChartIcon,
  AutoStories as AutoStoriesIcon,
  Settings as SettingsIcon,
  Wc as WcIcon,
  Plumbing as PlumbingIcon,
  Bathtub as BathtubIcon,
  Bathroom as BathroomIcon,
} from '@mui/icons-material';

// Re-export Lucide Icons
export {
  Toilet as ToiletIcon,
} from 'lucide-react';