import * as React from "react";
import {
  Select,
  Typography,
  Box,
  SwipeableDrawer,
  Button,
  List,
  MenuItem,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import categories from "../data/category";
import { NewsState } from "../../Context";

export default function Drawer() {
  const { setCategory, country, setCountry } = NewsState();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Container sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="h5" component="div">
          Country
        </Typography>
        <Select
          variant="outlined"
          style={{ width: 100, height: 40, margin: 15 }}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <MenuItem value={"us"}>USA</MenuItem>
          <MenuItem value={"in"}>INDIA</MenuItem>
        </Select>
      </Container>
      <Container
        sx={{ borderTop: "1px solid gray", textAlign: "center", mt: 1 }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mt: 1 }}
          component="div"
        >
          Categories
        </Typography>
        <List>
          {categories.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setCategory(text)}>
                <ListItemText sx={{ textAlign: "center" }} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button sx={{ mr: 1, color:"white" }} onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </Button>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
