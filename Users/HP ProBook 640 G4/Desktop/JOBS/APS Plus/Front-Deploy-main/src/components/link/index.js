import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const themeLabelForm = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        underlineHover: {
          textDecoration: "none",
          borderBottom: "#fff 3px solid",
        },
        underlineAlways: {
          textDecoration: "none",
          borderBottom: "#ebb70c 3px solid",
        },
      },
    },
  },
});

const themeNavBar = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        underlineHover: {
          "&:hover": {
            textDecoration: "none",
            borderBottom: "#ebb70c 3px solid",
          },
          textDecoration: "none",
          borderBottom: "#fff 3px solid",
        },
      },
    },
  },
});

const StyledLink = ({
  abaLink = false,
  href = "#",
  onClick = null,
  underline,
  text,
  state = null,
  themeDefault = true,
}) => {
  const navigate = useNavigate();
  if (String(text).includes("Voltar")) {
    onClick = () => navigate(-1, { state: state ?? null })
  }
  if (!abaLink) {
    return (
      <ThemeProvider theme={themeDefault ? themeLabelForm : themeNavBar}>
        <Link
          onClick={onClick}
          underline={underline}
          sx={{ cursor: "pointer", color: "black" }}
        >
          {text}
        </Link>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={themeDefault ? themeLabelForm : themeNavBar}>
        <Link
          href={href}
          to={{ pathname: href }}
          target="_blank"
          underline={underline}
          sx={{ cursor: "pointer", color: "black" }}
        >
          {text}
        </Link>
      </ThemeProvider>
    );
  }
};

export default StyledLink;
