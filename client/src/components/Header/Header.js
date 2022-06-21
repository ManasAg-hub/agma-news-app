import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "../Drawer/Drawer";
import { NewsState } from "../../Context";
import { Container } from "@mui/system";
import { Button } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const {fetchNewsBySearch, keyword, setKeyword, isDark, setIsDark } =
    NewsState();

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword === "") return;
    fetchNewsBySearch(keyword);
    setKeyword("");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Drawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            News-App
          </Typography>
          <Container sx={{ display: "flex", flexDirection: "row", width: 350 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder=""
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
                value={keyword}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && keyword !== "") {
                    fetchNewsBySearch();
                    setKeyword("");
                  }
                }}
              />
            </Search>
            <Button onClick={handleSubmit} sx={{ ml: 1, color: "white" }}>
              Search
            </Button>
          </Container>

          <Button onClick={() => setIsDark((isDark) => !isDark)}>
            {isDark ? (
              <DarkModeIcon sx={{ color: "white" }} />
            ) : (
              <LightModeIcon sx={{ color: "white" }} />
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
