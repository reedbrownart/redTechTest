import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", color: "#000000" }}
    >
      <Toolbar disableGutters sx={{ minHeight: "64px" }}>

        {/* This button doesn't have functionality though it was in the design */}

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 1, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>

        {/* These buttons do not have functionality though they were in the design */}

        <Grid>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <PersonIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
