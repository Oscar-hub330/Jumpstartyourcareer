import { createTheme } from "@mui/material/styles";

const ACCENT = "#fea434";

const adminTheme = createTheme({
  palette: {
    primary: {
      main: ACCENT,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontWeight: 700,
        },
      },
    },
  },
});

export default adminTheme;
